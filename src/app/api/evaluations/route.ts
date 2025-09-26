import { computeOverviewStats, filterEvaluations, toCSV, EVALUATIONS } from "@/lib/mock";
import { QCEvaluation } from "@/types";
import * as XLSX from 'xlsx';

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const as = Object.fromEntries(searchParams.entries());
    const rows = filterEvaluations({
      bot: as.bot,
      team: as.team,
      from: as.from,
      to: as.to,
      status: as.status,
      search: as.search,
    });
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/csv") || as.format === "csv") {
      const csv = toCSV(rows);
      return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8" } });
    }
    const stats = computeOverviewStats(rows);
    return Response.json({ rows, stats });
  } catch (e: any) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const excelFile = formData.get('excelFile') as File;
    const bot = formData.get('bot') as string;
    const team = formData.get('team') as string;
    const priority = formData.get('priority') as string;
    
    // Validate required fields
    if (!excelFile || !bot || !team) {
      return Response.json(
        { error: 'Missing required fields: excelFile, bot, team' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!allowedTypes.includes(excelFile.type)) {
      return Response.json(
        { error: 'Invalid file type. Please upload an Excel file (.xlsx or .xls)' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (excelFile.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Parse Excel file
    const arrayBuffer = await excelFile.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first worksheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    
    // Extract conversation data from Excel
    const conversationData = parseExcelToConversation(jsonData);
    
    if (!conversationData || conversationData.turns.length === 0) {
      return Response.json(
        { error: 'No valid conversation data found in Excel file' },
        { status: 400 }
      );
    }

    // Generate new evaluation ID
    const newId = String(Math.floor(Math.random() * 90000) + 10000);
    const conversationId = `conv_${newId}`;
    const now = new Date();

    // Create new QC evaluation with default values
    const newEvaluation: QCEvaluation = {
      id: newId,
      conversation_id: conversationId,
      status: "pending",
      score: 0,
      final_status: "Review",
      parameters: {
        param_1: false,
        param_2: false,
        param_3: false,
        param_4: false,
        param_5: false,
        param_7: false,
        param_8: false,
        param_9: false,
        param_10: false,
        param_11: false,
        param_12: false,
        weights: [8, 7, 9, 6, 8, 7, 6, 9, 8, 7, 8],
        raw_score: 0,
        weighted_score: 0
      },
      evidence: [],
      penalties: [],
      overrides: [],
      kb_verification: {
        score: 0,
        matched_chunks: [],
        verification_status: "SUPPORTED",
        verified: false,
        top_k_results: 5,
        filter_criteria: { doc_type: "general", version: "v2.3" }
      },
      processing_stages: [
        {
          stage: "data_preprocessing",
          status: "pending",
          progress_percentage: 0
        }
      ],
      created_at: now,
      priority: priority as "low" | "medium" | "high" | "critical",
      coverage_percentage: 0
    };

    // Add to mock data (in a real app, this would save to database)
    EVALUATIONS.unshift(newEvaluation);

    return Response.json(
      {
        success: true,
        data: newEvaluation,
        conversation_data: conversationData,
        message: "Excel file processed and QC evaluation created successfully"
      },
      { status: 201 }
    );
  } catch (e: any) {
    return Response.json(
      { error: String(e?.message || e) },
      { status: 500 }
    );
  }
}

// Helper function to parse Excel data into conversation format
function parseExcelToConversation(jsonData: any[][]): any {
  if (!jsonData || jsonData.length < 2) {
    return null;
  }

  // Assume first row contains headers
  const headers = jsonData[0].map(h => String(h).toLowerCase().trim());
  const rows = jsonData.slice(1);

  // Find column indices
  const speakerIndex = headers.findIndex(h => h.includes('speaker') || h.includes('role') || h.includes('from'));
  const contentIndex = headers.findIndex(h => h.includes('content') || h.includes('message') || h.includes('text'));
  const timestampIndex = headers.findIndex(h => h.includes('timestamp') || h.includes('time') || h.includes('date'));
  
  // Alternative: if no headers found, assume standard order: speaker, content, timestamp
  const finalSpeakerIndex = speakerIndex >= 0 ? speakerIndex : 0;
  const finalContentIndex = contentIndex >= 0 ? contentIndex : 1;
  const finalTimestampIndex = timestampIndex >= 0 ? timestampIndex : 2;

  const turns = rows
    .filter(row => row && row.length > Math.max(finalSpeakerIndex, finalContentIndex))
    .map((row, index) => {
      const speaker = String(row[finalSpeakerIndex] || '').toLowerCase().trim();
      const content = String(row[finalContentIndex] || '').trim();
      const timestamp = row[finalTimestampIndex] ? 
        String(row[finalTimestampIndex]) : 
        new Date(Date.now() + index * 1000).toISOString();

      return {
        speaker: speaker.includes('bot') || speaker.includes('assistant') ? 'bot' : 'user',
        content,
        timestamp
      };
    })
    .filter(turn => turn.content.length > 0);

  return {
    turns,
    metadata: {
      channel: 'excel_upload',
      session_id: `session_${Date.now()}`,
      user_id: 'excel_user'
    }
  };
}


