"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  User, 
  Bot, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Database,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Share,
  ArrowLeft
} from "lucide-react";
import { QCEvaluation, Turn, Evidence, Priority } from "@/types";

interface ConversationDetailProps {
  evaluation: QCEvaluation;
  onBack?: () => void;
}

export default function ConversationDetail({ evaluation, onBack }: ConversationDetailProps) {
  const [activeTab, setActiveTab] = useState("conversation");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFinalStatusBadge = (finalStatus: string) => {
    switch (finalStatus) {
      case "OK":
        return <Badge variant="default" className="bg-green-100 text-green-800">OK</Badge>;
      case "NOT OK":
        return <Badge variant="destructive">NOT OK</Badge>;
      case "CRITICAL":
        return <Badge variant="destructive" className="bg-red-600">CRITICAL</Badge>;
      default:
        return <Badge variant="outline">{finalStatus}</Badge>;
    }
  };

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getProcessingTime = () => {
    if (evaluation.completed_at) {
      const diff = evaluation.completed_at.getTime() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h`;
    }
    if (evaluation.status === "processing") {
      const diff = currentTime.getTime() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h (ongoing)`;
    }
    return "-";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Evaluation #{evaluation.id}
            </h1>
            <p className="text-muted-foreground">
              Conversation: {evaluation.conversation_id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStatusBadge(evaluation.status)}
              {getFinalStatusBadge(evaluation.final_status)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluation.score}</div>
            <p className="text-xs text-muted-foreground">
              out of 100
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluation.coverage_percentage}%</div>
            <Progress value={evaluation.coverage_percentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProcessingTime()}</div>
            <p className="text-xs text-muted-foreground">
              Priority: {getPriorityBadge(evaluation.priority)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="conversation">
          <ConversationView evaluation={evaluation} />
        </TabsContent>

        <TabsContent value="analysis">
          <AnalysisView evaluation={evaluation} />
        </TabsContent>

        <TabsContent value="evidence">
          <EvidenceView evaluation={evaluation} />
        </TabsContent>

        <TabsContent value="parameters">
          <ParametersView evaluation={evaluation} />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBaseView evaluation={evaluation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConversationView({ evaluation }: { evaluation: QCEvaluation }) {
  // Mock conversation data based on evaluation
  const mockTurns: Turn[] = [
    {
      id: "turn_1",
      conversation_id: evaluation.conversation_id,
      speaker: "user",
      content: "Hi, I need help with my billing issue. I was charged twice for the same service.",
      timestamp: new Date(evaluation.created_at.getTime() - 300000)
    },
    {
      id: "turn_2", 
      conversation_id: evaluation.conversation_id,
      speaker: "bot",
      content: "I understand your concern about the duplicate charge. Let me look into your account to investigate this billing issue.",
      timestamp: new Date(evaluation.created_at.getTime() - 240000)
    },
    {
      id: "turn_3",
      conversation_id: evaluation.conversation_id,
      speaker: "user", 
      content: "Thank you. The charges are from last month, both for $29.99.",
      timestamp: new Date(evaluation.created_at.getTime() - 180000)
    },
    {
      id: "turn_4",
      conversation_id: evaluation.conversation_id,
      speaker: "bot",
      content: "I can see the duplicate charges in your account. I'll process a refund for the duplicate $29.99 charge right away. You should see it reflected in 3-5 business days.",
      timestamp: new Date(evaluation.created_at.getTime() - 120000)
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Conversation Transcript</span>
        </CardTitle>
        <CardDescription>
          Full conversation between customer and agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {mockTurns.map((turn) => (
              <div key={turn.id} className={`flex ${turn.speaker === 'bot' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  turn.speaker === 'bot' 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {turn.speaker === 'bot' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs font-medium capitalize">{turn.speaker}</span>
                    <span className="text-xs text-muted-foreground">
                      {turn.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{turn.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function AnalysisView({ evaluation }: { evaluation: QCEvaluation }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>QC Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Overall Assessment</h4>
            <p className="text-sm text-muted-foreground">
              The agent handled the billing inquiry professionally and efficiently. 
              All required parameters were covered and the resolution was appropriate.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Strengths</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Quick acknowledgment of customer concern</li>
              <li>• Proper investigation process followed</li>
              <li>• Clear explanation of resolution steps</li>
              <li>• Appropriate timeline provided</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Areas for Improvement</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Could have offered additional verification steps</li>
              <li>• Missing proactive follow-up scheduling</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scoring Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Problem Identification</span>
                <span>95%</span>
              </div>
              <Progress value={95} />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Solution Accuracy</span>
                <span>90%</span>
              </div>
              <Progress value={90} />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Communication Quality</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Process Adherence</span>
                <span>88%</span>
              </div>
              <Progress value={88} />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customer Satisfaction</span>
                <span>92%</span>
              </div>
              <Progress value={92} />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Score</span>
            <span className="text-2xl font-bold">{evaluation.score}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EvidenceView({ evaluation }: { evaluation: QCEvaluation }) {
  return (
    <div className="space-y-4">
      {evaluation.evidence.map((evidence, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{evidence.kb_document}</span>
              </span>
              <Badge variant={evidence.evidence_type === 'supporting' ? "default" : "destructive"}>
                {evidence.evidence_type === 'supporting' ? "Supporting" : evidence.evidence_type === 'contradicting' ? "Contradicting" : "Missing"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Evidence Text</h4>
                <p className="text-sm bg-muted p-2 rounded">
                  {evidence.evidence_type || "No evidence found"}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Location</h4>
                <p className="text-sm text-muted-foreground">
                  Turn {evidence.turn_index + 1}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Confidence</h4>
                <div className="flex items-center space-x-2">
                  <Progress value={evidence.confidence * 100} className="flex-1" />
                  <span className="text-sm">{Math.round(evidence.confidence * 100)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ParametersView({ evaluation }: { evaluation: QCEvaluation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parameter Coverage Analysis</CardTitle>
        <CardDescription>
          Detailed breakdown of QC parameters and their evaluation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(evaluation.parameters).filter(([key]) => key.startsWith('param_')).map(([key, value], index) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{key.replace('param_', 'Parameter ')}</h4>
                <Badge variant={value ? "default" : "destructive"}>
                  {value ? "Pass" : "Fail"}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Evaluation parameter for quality control assessment.
              </p>
              
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <span className="text-xs text-muted-foreground">Weight</span>
                  <div className="font-medium">1.0</div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Score</span>
                  <div className="font-medium">{value ? '100' : '0'}</div>
                </div>
              </div>
              
              {!value && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                  <span className="font-medium text-red-800">Failed: </span>
                  <span className="text-red-600">Parameter evaluation failed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KnowledgeBaseView({ evaluation }: { evaluation: QCEvaluation }) {
  const kbVerification = evaluation.kb_verification;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Knowledge Base Verification</span>
        </CardTitle>
        <CardDescription>
          Verification against company knowledge base and policies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Verification Status</span>
            <Badge variant={kbVerification?.verified ? "default" : "destructive"}>
              {kbVerification?.verified ? "Verified" : "Not Verified"}
            </Badge>
          </div>
          
          {kbVerification?.matched_chunks && kbVerification.matched_chunks.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Matched Knowledge Chunks</h4>
              <div className="space-y-2">
                {kbVerification.matched_chunks.map((chunk: any, index: number) => (
                  <div key={index} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">Chunk {chunk.id || index + 1}</span>
                      <span className="text-xs text-muted-foreground">
                        Score: {chunk.score || 'N/A'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{chunk.content || 'No content available'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {kbVerification?.verification_status === 'CONTRADICTED' && (
            <div>
              <h4 className="font-medium mb-2 text-red-600">Policy Discrepancies</h4>
              <div className="space-y-2">
                <div className="border border-red-200 rounded p-3 bg-red-50">
                  <div className="font-medium text-sm text-red-800 mb-1">
                    Contradiction Found
                  </div>
                  <p className="text-sm text-red-600">Knowledge base verification found contradictory information.</p>
                  <p className="text-xs text-red-500 mt-1">
                    Severity: High
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Top K Results</span>
                <div className="font-medium">
                  {kbVerification?.top_k_results || "N/A"}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Verified</span>
                <div className="font-medium">{kbVerification?.verified ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}