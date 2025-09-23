import { QCEvaluation, OverviewStats, QueueStats, ScoreDistribution, StatusBreakdown, SystemHealth } from '@/types';

const now = new Date();

export const EVALUATIONS: QCEvaluation[] = [
  {
    id: "98231",
    conversation_id: "conv_98231",
    status: "completed",
    score: 73,
    final_status: "Review",
    parameters: {
      param_1: true,  // Greeting Protocol
      param_2: true,  // Active Listening
      param_3: false, // Solution Accuracy
      param_4: true,  // Empathy
      param_5: false, // Knowledge Base Usage
      param_7: true,  // Follow-up
      param_8: true,  // Professional Tone
      param_9: false, // Resolution
      param_10: true, // Data Privacy
      param_11: true, // Closure
      param_12: false,
      weights: [8, 7, 9, 6, 8, 7, 6, 9, 8, 7, 8], // Total: 83
      raw_score: 7,
      weighted_score: 84.3
    },
    evidence: [
      {
        id: "ev_001",
        turn_index: 1,
        kb_chunk_id: "KB_CHUNK_001",
        evidence_type: "supporting",
        confidence: 0.85,
        content_snippet: "Billing procedures require account verification",
        kb_document: "billing_procedures_v2.3.pdf",
        kb_version: "v2.3"
      }
    ],
    penalties: [
      {
        type: "blaming",
        value: -30,
        reason: "Evidence missing for critical claim",
        applied_at: new Date(now.getTime() - 6.5 * 3600_000)
      }
    ],
    overrides: [
      {
        type: "P&P_EVIDENCE_MISSING",
        reason: "Turn 4 lacks KB support",
        auto_applied: true,
        applied_at: new Date(now.getTime() - 6.5 * 3600_000)
      }
    ],
    kb_verification: {
      score: 62,
      matched_chunks: [],
      verification_status: "EVIDENCE_MISSING",
      top_k_results: 5,
      filter_criteria: { doc_type: "billing", version: "v2.3" }
    },
    processing_stages: [
      {
        stage: "completed",
        status: "completed",
        started_at: new Date(now.getTime() - 6.5 * 3600_000),
        completed_at: new Date(now.getTime() - 6.4 * 3600_000),
        progress_percentage: 100
      }
    ],
    created_at: new Date(now.getTime() - 6.5 * 3600_000),
    completed_at: new Date(now.getTime() - 6.4 * 3600_000),
    sla_due: new Date(now.getTime() + 18 * 3600_000),
    priority: "high"
  },
  {
    id: "98232",
    conversation_id: "conv_98232",
    status: "completed",
    score: 86,
    final_status: "OK",
    parameters: {
      param_1: true,
      param_2: true,
      param_3: true,
      param_4: true,
      param_5: true,
      param_7: true,
      param_8: true,
      param_9: true,
      param_10: true,
      param_11: true,
      param_12: true,
      weights: [8, 7, 9, 6, 8, 7, 6, 9, 8, 7, 8],
      raw_score: 10,
      weighted_score: 86
    },
    evidence: [],
    penalties: [],
    overrides: [],
    kb_verification: {
      score: 91,
      matched_chunks: [],
      verification_status: "SUPPORTED",
      top_k_results: 5,
      filter_criteria: { doc_type: "support", version: "v2.3" }
    },
    processing_stages: [
      {
        stage: "completed",
        status: "completed",
        started_at: new Date(now.getTime() - 3.2 * 3600_000),
        completed_at: new Date(now.getTime() - 3.1 * 3600_000),
        progress_percentage: 100
      }
    ],
    created_at: new Date(now.getTime() - 3.2 * 3600_000),
    completed_at: new Date(now.getTime() - 3.1 * 3600_000),
    priority: "medium"
  },
  {
    id: "98233",
    conversation_id: "conv_98233",
    status: "completed",
    score: 61,
    final_status: "Not OK",
    parameters: {
      param_1: false,
      param_2: false,
      param_3: false,
      param_4: true,
      param_5: false,
      param_7: false,
      param_8: true,
      param_9: false,
      param_10: false,
      param_11: false,
      param_12: false,
      weights: [8, 7, 9, 6, 8, 7, 6, 9, 8, 7, 8],
      raw_score: 3,
      weighted_score: 61
    },
    evidence: [],
    penalties: [
      {
        type: "data_validation",
        value: -50,
        reason: "Critical contradiction in response",
        applied_at: new Date(now.getTime() - 10.1 * 3600_000)
      }
    ],
    overrides: [
      {
        type: "CRITICAL_CONTRADICTION",
        reason: "Bot provided contradictory information",
        auto_applied: true,
        applied_at: new Date(now.getTime() - 10.1 * 3600_000)
      }
    ],
    kb_verification: {
      score: 40,
      matched_chunks: [],
      verification_status: "CONTRADICTED",
      top_k_results: 5,
      filter_criteria: { doc_type: "onboarding", version: "v2.2" }
    },
    processing_stages: [
      {
        stage: "completed",
        status: "completed",
        started_at: new Date(now.getTime() - 10.1 * 3600_000),
        completed_at: new Date(now.getTime() - 10.0 * 3600_000),
        progress_percentage: 100
      }
    ],
    created_at: new Date(now.getTime() - 10.1 * 3600_000),
    completed_at: new Date(now.getTime() - 10.0 * 3600_000),
    sla_due: new Date(now.getTime() + 6 * 3600_000),
    priority: "critical"
  },
  {
    id: "98234",
    conversation_id: "conv_98234",
    status: "processing",
    score: 0,
    final_status: "Review",
    parameters: {
      param_1: true,
      param_2: true,
      param_3: true,
      param_4: true,
      param_5: true,
      param_7: true,
      param_8: true,
      param_9: true,
      param_10: true,
      param_11: false,
      param_12: true,
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
      top_k_results: 5,
      filter_criteria: { doc_type: "billing", version: "v2.3" }
    },
    processing_stages: [
      {
        stage: "llm_call_2",
        status: "processing",
        started_at: new Date(now.getTime() - 0.1 * 3600_000),
        progress_percentage: 80,
        estimated_completion: new Date(now.getTime() + 0.03 * 3600_000)
      }
    ],
    created_at: new Date(now.getTime() - 1.1 * 3600_000),
    started_at: new Date(now.getTime() - 0.1 * 3600_000),
    priority: "medium"
  }
];

// Additional mock data
export const MOCK_BOTS = ["Billing", "Support", "Onboarding", "Sales", "Technical"];
export const MOCK_TEAMS = ["Team A", "Team B", "Team C", "Team D"];

export const MOCK_QUEUE_STATS: QueueStats = {
  pending: 24,
  processing: 3,
  completed: 156,
  failed: 2,
  avgProcessingTime: 4.2,
  slaBreaches: 5
};

export const MOCK_SYSTEM_HEALTH: SystemHealth = {
  llm_service: {
    status: "healthy",
    uptime_percentage: 98.5,
    response_time_ms: 1250
  },
  database: {
    status: "connected",
    latency_ms: 12
  },
  queue: {
    status: "healthy",
    pending_count: 24,
    processing_count: 3
  },
  kb_service: {
    status: "degraded",
    index_size: 1247,
    last_sync: new Date(now.getTime() - 2 * 3600_000)
  }
};

export function filterEvaluations(params: { bot?: string; team?: string; from?: string; to?: string; status?: string; search?: string; priority?: string }) {
  const { bot, team, from, to, status, search, priority } = params;
  const fromTs = from ? Date.parse(from) : undefined;
  const toTs = to ? Date.parse(to) : undefined;
  
  return EVALUATIONS.filter((e) => {
    // Extract bot and team from conversation metadata (simplified for mock)
    const evalBot = e.conversation_id.includes("billing") ? "Billing" : 
                   e.conversation_id.includes("support") ? "Support" : "Onboarding";
    const evalTeam = e.id.endsWith("1") ? "Team A" : 
                    e.id.endsWith("2") ? "Team B" : "Team C";
    
    if (bot && evalBot !== bot) return false;
    if (team && evalTeam !== team) return false;
    if (status && e.final_status !== status) return false;
    if (priority && e.priority !== priority) return false;
    
    const t = e.created_at.getTime();
    if (fromTs && t < fromTs) return false;
    if (toTs && t > toTs) return false;
    
    if (search && !(`#${e.id}`.includes(search) || evalBot.toLowerCase().includes(search.toLowerCase()))) return false;
    
    return true;
  });
}

export function computeOverviewStats(rows: QCEvaluation[]): OverviewStats {
  if (rows.length === 0) return { 
    avgScore: 0, 
    okPct: 0, 
    coverage: 0, 
    kbVerify: 0, 
    qcTATHours: 0,
    totalEvaluations: 0,
    pendingEvaluations: 0,
    trends: { avgScore: 0, okPct: 0, coverage: 0, kbVerify: 0, qcTATHours: 0 }
  };
  
  const completedRows = rows.filter(r => r.status === 'completed');
  const avgScore = Math.round((completedRows.reduce((s, r) => s + r.score, 0) / completedRows.length) * 10) / 10;
  const okPct = Math.round((rows.filter((r) => r.final_status === "OK").length / rows.length) * 100);
  const kbVerify = Math.round((rows.reduce((s, r) => s + (r.kb_verification?.verified ? 100 : 0), 0) / rows.length));
  const coverage = Math.round((rows.reduce((s, r) => s + r.coverage_percentage, 0) / rows.length));
  const qcTATHours = Math.round((rows.reduce((s, r) => {
    const processingTime = r.completed_at ? 
      (r.completed_at.getTime() - r.created_at.getTime()) / (1000 * 60 * 60) : 0;
    return s + processingTime;
  }, 0) / rows.length) * 10) / 10;
  
  return { 
    avgScore, 
    okPct, 
    coverage, 
    kbVerify, 
    qcTATHours,
    totalEvaluations: rows.length,
    pendingEvaluations: rows.filter(r => r.status === 'pending').length,
    trends: { avgScore: 2.1, okPct: 5, coverage: -1.2, kbVerify: 3.4, qcTATHours: -0.3 }
  };
}

export function toCSV(rows: Evaluation[]): string {
  const header = ["id","bot","team","end","score","status","overrides","penalties","kbVerify","slaDue","model"];
  const body = rows.map((r) => [r.id, r.bot, r.team, r.end, r.score, r.status, r.overrides.join("|"), r.penalties.join("|"), r.kbVerify, r.slaDue, r.model]);
  return [header, ...body].map((row) => row.map((v) => `"${String(v).replaceAll('"','\"')}"`).join(",")).join("\n");
}


