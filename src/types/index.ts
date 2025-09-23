// Core data types for the Agentic QC AI Platform

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Conversation {
  id: string;
  bot: string;
  team: string;
  timestamp: Date;
  turns: Turn[];
  metadata: ConversationMetadata;
}

export interface Turn {
  id: string;
  conversation_id: string;
  speaker: 'user' | 'bot';
  content: string;
  timestamp: Date;
  structured_data?: any;
  parameters?: TurnParameters;
  evidence?: Evidence[];
}

export interface ConversationMetadata {
  channel: string;
  user_id?: string;
  session_id: string;
  bot_version: string;
  language: string;
}

export interface QCEvaluation {
  id: string;
  conversation_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  score: number;
  final_status: 'OK' | 'Review' | 'Not OK';
  parameters: EvaluationParameters;
  evidence: Evidence[];
  penalties: Penalty[];
  overrides: Override[];
  kb_verification: KBVerification;
  processing_stages: ProcessingStage[];
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
  sla_due?: Date;
  priority: Priority;
  coverage_percentage: number;
}

export interface EvaluationParameters {
  // 11 parameters from grand design (excluding param_6 and param_13)
  param_1: boolean; // Greeting Protocol
  param_2: boolean; // Active Listening
  param_3: boolean; // Solution Accuracy
  param_4: boolean; // Empathy
  param_5: boolean; // Knowledge Base Usage
  param_7: boolean; // Follow-up
  param_8: boolean; // Professional Tone
  param_9: boolean; // Resolution
  param_10: boolean; // Data Privacy
  param_11: boolean; // Closure
  param_12: boolean; // Additional parameter
  weights: number[]; // bobot efektif = 83
  raw_score: number;
  weighted_score: number;
}

export interface TurnParameters {
  [key: string]: boolean | { [key: string]: number };
  confidence_scores: { [key: string]: number };
}

export interface Evidence {
  id: string;
  turn_index: number;
  kb_chunk_id: string;
  evidence_type: 'supporting' | 'contradicting' | 'missing';
  confidence: number;
  content_snippet: string;
  kb_document: string;
  kb_version: string;
}

export interface KBVerification {
  score: number; // 0-100
  matched_chunks: KBChunk[];
  verification_status: 'SUPPORTED' | 'EVIDENCE_MISSING' | 'CONTRADICTED';
  verified: boolean;
  top_k_results: number;
  filter_criteria: {
    doc_type?: string;
    version?: string;
  };
}

export interface KBChunk {
  id: string;
  content: string;
  document_id: string;
  document_name: string;
  doc_type: string;
  version: string;
  embedding_vector?: number[];
  metadata: Record<string, any>;
}

export interface Penalty {
  type: 'blaming' | 'data_validation' | 'custom';
  value: number; // negative value
  reason: string;
  applied_at: Date;
}

export interface Override {
  type: 'P&P_EVIDENCE_MISSING' | 'CRITICAL_CONTRADICTION' | 'VALIDASI_SENSITIF_FAIL';
  reason: string;
  auto_applied: boolean;
  applied_at: Date;
}

export interface ProcessingStage {
  stage: 'data_preprocessing' | 'llm_call_1' | 'system_retrieve' | 'llm_call_2' | 'scoring' | 'completed';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  started_at?: Date;
  completed_at?: Date;
  error_message?: string;
  progress_percentage: number;
  estimated_completion?: Date;
}

// Dashboard and Statistics Types
export interface OverviewStats {
  avgScore: number;
  okPct: number;
  coverage: number;
  kbVerify: number;
  qcTATHours: number;
  totalEvaluations: number;
  pendingEvaluations: number;
  trends: {
    avgScore: number;
    okPct: number;
    coverage: number;
    kbVerify: number;
    qcTATHours: number;
  };
}

export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  avgProcessingTime: number;
  slaBreaches: number;
}

export interface ScoreDistribution {
  ranges: {
    range: string;
    count: number;
    percentage: number;
  }[];
}

export interface StatusBreakdown {
  ok: number;
  review: number;
  notOk: number;
  total: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface EvaluationListResponse {
  rows: QCEvaluation[];
  stats: OverviewStats;
  filters: {
    bots: string[];
    teams: string[];
    statuses: string[];
  };
}

// Filter and Search Types
export interface EvaluationFilters {
  bot?: string;
  team?: string;
  status?: string;
  from?: string;
  to?: string;
  search?: string;
  priority?: string;
  sla_status?: 'on_time' | 'at_risk' | 'breached';
}

export interface QueueFilters {
  status?: string;
  priority?: string;
  bot?: string;
  team?: string;
  sla_status?: string;
}

// LLM Integration Types
export interface LLMRequest {
  conversation_id: string;
  stage: 'self_windowing' | 'kb_verification';
  turns: Turn[];
  kb_context?: KBChunk[];
  parameters: Record<string, any>;
}

export interface LLMResponse {
  evaluation_id: string;
  stage: string;
  parameters?: EvaluationParameters;
  evidence?: Evidence[];
  kb_verification?: KBVerification;
  confidence_score: number;
  processing_time_ms: number;
  token_usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// System Configuration Types
export interface SystemConfig {
  llm: {
    primary_model: string;
    fallback_model: string;
    temperature: number;
    max_tokens: number;
    rate_limit: number;
  };
  scoring: {
    parameter_weights: Record<string, number>;
    thresholds: {
      ok: number;
      review: number;
    };
    penalties: {
      blaming: number;
      data_validation: number;
    };
  };
  kb: {
    top_k: number;
    similarity_threshold: number;
    supported_doc_types: string[];
  };
  queue: {
    max_concurrent_jobs: number;
    retry_attempts: number;
    sla_hours: Record<string, number>; // by priority
  };
}

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'qc_lead' | 'analyst' | 'viewer';
  teams: string[];
  permissions: string[];
  last_login?: Date;
  created_at: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expires_at: Date;
}

// Real-time Updates
export interface RealtimeUpdate {
  type: 'evaluation_status' | 'queue_update' | 'system_health';
  data: any;
  timestamp: Date;
}

// Alias for backward compatibility
export type Evaluation = QCEvaluation;

export interface SystemHealth {
  llm_service: {
    status: 'healthy' | 'degraded' | 'down';
    uptime_percentage: number;
    response_time_ms: number;
  };
  database: {
    status: 'connected' | 'disconnected';
    latency_ms: number;
  };
  queue: {
    status: 'healthy' | 'overloaded';
    pending_count: number;
    processing_count: number;
  };
  kb_service: {
    status: 'healthy' | 'degraded' | 'down';
    index_size: number;
    last_sync: Date;
  };
}