# Agentic QC AI Platform - System Architecture

## Overview
This document outlines the system architecture for the Agentic QC AI platform based on the grand design concept. The platform implements an LLM-centric quality control system with self-windowing capabilities and evidence-based scoring.

## System Architecture

### 1. Frontend Layer (Next.js 15 + React 19)
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                     │
├─────────────────────────────────────────────────────────────┤
│  Dashboard    │  QC Queue    │  Conversation  │  Admin      │
│  - Overview   │  - Pending   │  - Detail View │  - Config   │
│  - Metrics    │  - Review    │  - Evidence    │  - Users    │
│  - Charts     │  - History   │  - Scoring     │  - Models   │
└─────────────────────────────────────────────────────────────┘
```

### 2. API Layer (Next.js API Routes)
```
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                           │
├─────────────────────────────────────────────────────────────┤
│  /api/evaluations     │  /api/conversations  │  /api/admin  │
│  /api/qc-queue        │  /api/scoring        │  /api/kb     │
│  /api/llm             │  /api/evidence       │  /api/stats  │
└─────────────────────────────────────────────────────────────┘
```

### 3. Core Processing Engine
```
┌─────────────────────────────────────────────────────────────┐
│                  Data Processing Pipeline                   │
├─────────────────────────────────────────────────────────────┤
│  Data Preprocessing  │  LLM Processing     │  Scoring       │
│  ┌─────────────────┐ │ ┌─────────────────┐ │ ┌─────────────┐ │
│  │ Basic Cleaning  │ │ │ Self-Windowing  │ │ │ Score Calc  │ │
│  │ Ingest & Mask   │ │ │ + Judge (Call#1)│ │ │ Penalties   │ │
│  │ Turn Structure  │ │ │ System Retrieve │ │ │ Overrides   │ │
│  │                 │ │ │ Verification    │ │ │ Final Score │ │
│  │                 │ │ │ (Call #2)       │ │ │ (0-100)     │ │
│  └─────────────────┘ │ └─────────────────┘ │ └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 4. LLM Integration Layer
```
┌─────────────────────────────────────────────────────────────┐
│                    LLM Service Layer                       │
├─────────────────────────────────────────────────────────────┤
│  LLM Call #1          │  System Retrieve    │  LLM Call #2  │
│  ┌─────────────────┐  │  ┌─────────────────┐ │ ┌───────────┐ │
│  │ Self-Windowing  │  │  │ KB Query        │ │ │ P&P       │ │
│  │ + Judge         │  │  │ (Top-k 3-5)     │ │ │ Verify    │ │
│  │ 11 Parameters   │  │  │ Filter by:      │ │ │ vs KB     │ │
│  │ Detect P&P      │  │  │ - doc_type      │ │ │           │ │
│  │                 │  │  │ - version       │ │ │           │ │
│  └─────────────────┘  │  └─────────────────┘ │ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 5. Knowledge Base & Evidence System
```
┌─────────────────────────────────────────────────────────────┐
│                Knowledge Base System                        │
├─────────────────────────────────────────────────────────────┤
│  Vector Store         │  Evidence Engine    │  Verification │
│  ┌─────────────────┐  │  ┌─────────────────┐ │ ┌───────────┐ │
│  │ Document Index  │  │  │ Turn Index      │ │ │ KB Chunk  │ │
│  │ Embeddings      │  │  │ KB Chunk ID     │ │ │ Matching  │ │
│  │ Metadata        │  │  │ Evidence Links  │ │ │ Scoring   │ │
│  │ - doc_type      │  │  │                 │ │ │           │ │
│  │ - version       │  │  │                 │ │ │           │ │
│  └─────────────────┘  │  └─────────────────┘ │ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 6. Scoring & Decision Engine
```
┌─────────────────────────────────────────────────────────────┐
│                  Scoring System                             │
├─────────────────────────────────────────────────────────────┤
│  Base Score: Σ[bobot×pass] → Score_100 = Raw×100/83        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Penalties:                                              │ │
│  │ • -30 Blaming                                           │ │
│  │ • -50 Data Validation (sensitive & failed)             │ │
│  │ ┌─────────────────────────────────────────────────────┐ │ │
│  │ │ Overrides (Auto-fail):                              │ │ │
│  │ │ • P&P_EVIDENCE_MISSING                              │ │ │
│  │ │ • CRITICAL_CONTRADICTION                            │ │ │
│  │ │ • VALIDASI_SENSITIF_FAIL → Not OK                   │ │ │
│  │ └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│  Final Categories: OK ≥80 • Review 65-79 • Not OK <65      │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Core Entities
```typescript
interface Conversation {
  id: string;
  bot: string;
  team: string;
  timestamp: Date;
  turns: Turn[];
  metadata: ConversationMetadata;
}

interface Turn {
  id: string;
  speaker: 'user' | 'bot';
  content: string;
  timestamp: Date;
  structured_data?: any;
}

interface QCEvaluation {
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
  created_at: Date;
  completed_at?: Date;
}

interface EvaluationParameters {
  // 11 parameters from grand design
  param_1: boolean;
  param_2: boolean;
  // ... (excluding param_6 and param_13 as per design)
  param_11: boolean;
  weights: number[]; // bobot efektif = 83
}

interface Evidence {
  turn_index: number;
  kb_chunk_id: string;
  evidence_type: 'supporting' | 'contradicting';
  confidence: number;
}

interface KBVerification {
  score: number; // 0-100
  matched_chunks: string[];
  verification_status: 'SUPPORTED' | 'EVIDENCE_MISSING' | 'CONTRADICTED';
}
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks + Context API
- **Charts**: Recharts or Chart.js
- **Real-time**: WebSockets for live updates

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Vector Store**: Pinecone or Weaviate for KB embeddings
- **Queue**: Redis for job processing
- **Cache**: Redis for performance optimization

### LLM Integration
- **Primary LLM**: OpenAI GPT-4 or Claude
- **Embeddings**: OpenAI text-embedding-ada-002
- **Fallback**: Multiple LLM providers for reliability
- **Rate Limiting**: Token bucket algorithm

### Infrastructure
- **Deployment**: Vercel or AWS
- **Monitoring**: Sentry for error tracking
- **Analytics**: Custom dashboard for QC metrics
- **Security**: JWT authentication, RBAC

## API Endpoints

### Core Endpoints
```
GET    /api/evaluations              # List evaluations with filters
POST   /api/evaluations              # Create new evaluation
GET    /api/evaluations/[id]         # Get evaluation details
PUT    /api/evaluations/[id]         # Update evaluation

GET    /api/qc-queue                 # Get pending QC items
POST   /api/qc-queue/process         # Process QC item

GET    /api/conversations/[id]       # Get conversation details
GET    /api/conversations/[id]/evidence # Get evidence for conversation

POST   /api/llm/evaluate             # Trigger LLM evaluation
POST   /api/llm/verify               # Trigger KB verification

GET    /api/kb/search                # Search knowledge base
POST   /api/kb/upload                # Upload KB documents

GET    /api/stats/overview           # Dashboard statistics
GET    /api/stats/performance        # Performance metrics
```

## Security Considerations

1. **Authentication**: JWT-based auth with role-based access
2. **Data Privacy**: PII masking in preprocessing
3. **API Security**: Rate limiting, input validation
4. **LLM Security**: Prompt injection prevention
5. **Audit Trail**: Complete logging of all QC decisions

## Scalability & Performance

1. **Horizontal Scaling**: Stateless API design
2. **Caching Strategy**: Multi-level caching (Redis, CDN)
3. **Queue Management**: Async processing for LLM calls
4. **Database Optimization**: Proper indexing, connection pooling
5. **Monitoring**: Real-time performance metrics

## Next Steps

1. Implement core data models and database schema
2. Build LLM integration service
3. Create knowledge base management system
4. Develop scoring engine
5. Build frontend components and wireframes