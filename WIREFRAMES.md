# Agentic QC AI Platform - UI Wireframes

## 1. Dashboard Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Agentic QC AI                                    🌙 Prototype v1                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Overview          │                                                             │
│ QC Queue          │  📊 QC Performance Dashboard                               │
│ Conversation      │                                                             │
│ Calibration       │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │
│ Sampling          │  │Avg Score│ │ OK Rate │ │Coverage │ │KB Verify│ │QC TAT │ │
│ Knowledge         │  │  78.5   │ │  67.2%  │ │  94.1%  │ │  82.3%  │ │ 4.2h  │ │
│ Incidents         │  │  ↗ +2.1 │ │  ↘ -1.3 │ │  ↗ +0.8 │ │  ↗ +3.2 │ │ ↘ -0.5│ │
│ Reports           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘ │
│ Admin             │                                                             │
│                   │  🔍 Filters: [All Bots ▼] [All Teams ▼] [All Status ▼]    │
│                   │                                                             │
│                   │  📈 Score Distribution        📊 Status Breakdown          │
│                   │  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│                   │  │     ▄▄▄                 │  │  ● OK (67%)             │  │
│                   │  │   ▄▄███▄▄               │  │  ● Review (23%)         │  │
│                   │  │ ▄▄███████▄▄             │  │  ● Not OK (10%)         │  │
│                   │  │▄███████████▄            │  │                         │  │
│                   │  └─────────────────────────┘  └─────────────────────────┘  │
│                   │                                                             │
│                   │  📋 Recent Evaluations                                     │
│                   │  ┌─────┬─────────┬──────┬───────┬────────┬─────────┬──────┐ │
│                   │  │ ID  │ Bot     │ Team │ Score │ Status │ KB Ver  │ Due  │ │
│                   │  ├─────┼─────────┼──────┼───────┼────────┼─────────┼──────┤ │
│                   │  │98231│ Billing │ A    │  73   │Review  │  62%    │ 18h  │ │
│                   │  │98232│ Support │ B    │  86   │ OK     │  91%    │  —   │ │
│                   │  │98233│Onboard  │ A    │  61   │Not OK  │  40%    │  6h  │ │
│                   │  │98234│ Billing │ C    │  79   │Review  │  84%    │  —   │ │
│                   │  └─────┴─────────┴──────┴───────┴────────┴─────────┴──────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 2. QC Queue Interface

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ QC Queue                                         🔄 Auto-refresh: ON            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                   │  🎯 Queue Management                                        │
│                   │                                                             │
│                   │  📊 Queue Stats                                             │
│                   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│                   │  │Pending  │ │Process  │ │Completed│ │ Failed  │           │
│                   │  │   24    │ │    3    │ │   156   │ │    2    │           │
│                   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                   │                                                             │
│                   │  🔍 [Search conversations...] [🔄 Refresh] [⚙️ Settings]   │
│                   │                                                             │
│                   │  📋 Queue Items                                             │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ 🟡 #98235 - Billing Bot - Team A                       │ │
│                   │  │    Submitted: 2h ago | Priority: High | SLA: 6h left   │ │
│                   │  │    [🚀 Process] [👁️ Preview] [📋 Details]              │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ 🟠 #98236 - Support Bot - Team B                       │ │
│                   │  │    Submitted: 4h ago | Priority: Medium | SLA: 12h     │ │
│                   │  │    [🚀 Process] [👁️ Preview] [📋 Details]              │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ 🔴 #98237 - Onboarding Bot - Team C                    │ │
│                   │  │    Submitted: 8h ago | Priority: Critical | SLA: 2h!   │ │
│                   │  │    [🚀 Process] [👁️ Preview] [📋 Details]              │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  🔄 Processing Status                                       │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ ⚡ #98234 - Currently Processing                        │ │
│                   │  │    Stage: LLM Call #2 (KB Verification)                │ │
│                   │  │    Progress: ████████░░ 80%                             │ │
│                   │  │    ETA: 2 minutes                                       │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3. Conversation Detail & Evidence View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Conversation #98231                              📊 Score: 73 | Status: Review  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                   │  💬 Conversation Flow                                       │
│                   │                                                             │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ 👤 User: I need help with my billing issue             │ │
│                   │  │    🕐 10:30 AM                                          │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ 🤖 Bot: I'd be happy to help with your billing.        │ │
│                   │  │    Can you provide your account number?                │ │
│                   │  │    🕐 10:30 AM | ✅ P1 ✅ P2 ❌ P3                      │ │
│                   │  │    📋 Evidence: KB_CHUNK_001 (Billing Procedures)      │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ 👤 User: Sure, it's ACC123456                          │ │
│                   │  │    🕐 10:31 AM                                          │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ 🤖 Bot: Let me check that for you...                   │ │
│                   │  │    🕐 10:31 AM | ✅ P4 ❌ P5 ✅ P7                      │ │
│                   │  │    ⚠️ Missing Evidence: No KB verification              │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  🎯 QC Analysis                                             │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ 📊 Parameter Evaluation (11 total)                     │ │
│                   │  │ ✅ P1: Greeting Protocol        ✅ P2: Active Listening │ │
│                   │  │ ❌ P3: Solution Accuracy        ✅ P4: Empathy          │ │
│                   │  │ ❌ P5: Knowledge Base Usage     ✅ P7: Follow-up        │ │
│                   │  │ ✅ P8: Professional Tone       ❌ P9: Resolution        │ │
│                   │  │ ✅ P10: Data Privacy           ✅ P11: Closure          │ │
│                   │  │                                                         │ │
│                   │  │ ⚖️ Scoring Breakdown                                    │ │
│                   │  │ Base Score: 7/11 × 100/83 = 84.3                       │ │
│                   │  │ Penalties: -30 (Evidence Missing)                      │ │
│                   │  │ Final Score: 73                                         │ │
│                   │  │                                                         │ │
│                   │  │ 🔍 Evidence Analysis                                    │ │
│                   │  │ KB Verification: 62% match                              │ │
│                   │  │ Missing Evidence: Turn 4 lacks KB support              │ │
│                   │  │ Override: P&P_EVIDENCE_MISSING                          │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 4. Admin Configuration Panel

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Admin Panel                                      👤 Admin User                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                   │  ⚙️ System Configuration                                    │
│                   │                                                             │
│                   │  🤖 LLM Settings                                            │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ Primary Model: [GPT-4 ▼]                               │ │
│                   │  │ Fallback Model: [Claude-3 ▼]                           │ │
│                   │  │ Temperature: [0.1] Max Tokens: [2048]                  │ │
│                   │  │ Rate Limit: [100] requests/minute                      │ │
│                   │  │ [💾 Save Settings]                                      │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  📊 Scoring Configuration                                   │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ Parameter Weights (Total: 83)                          │ │
│                   │  │ P1: [8] P2: [7] P3: [9] P4: [6] P5: [8]                │ │
│                   │  │ P7: [7] P8: [6] P9: [9] P10: [8] P11: [7]              │ │
│                   │  │                                                         │ │
│                   │  │ Thresholds:                                             │ │
│                   │  │ OK: [≥80] Review: [65-79] Not OK: [<65]                │ │
│                   │  │                                                         │ │
│                   │  │ Penalties:                                              │ │
│                   │  │ Blaming: [-30] Data Validation: [-50]                  │ │
│                   │  │ [💾 Save Configuration]                                 │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  📚 Knowledge Base Management                               │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ 📁 Documents: 1,247 | 🔄 Last Sync: 2h ago             │ │
│                   │  │ [📤 Upload] [🔄 Sync] [🗑️ Cleanup] [📊 Analytics]      │ │
│                   │  │                                                         │ │
│                   │  │ Recent Uploads:                                         │ │
│                   │  │ • billing_procedures_v2.3.pdf (✅ Indexed)             │ │
│                   │  │ • support_guidelines_v1.8.pdf (🔄 Processing)          │ │
│                   │  │ • escalation_matrix_v1.2.pdf (✅ Indexed)              │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  👥 User Management                                         │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ [➕ Add User] [📊 Activity Log] [🔐 Permissions]        │ │
│                   │  │                                                         │ │
│                   │  │ Active Users:                                           │ │
│                   │  │ • john.doe@company.com (Admin) - Last: 5m ago          │ │
│                   │  │ • jane.smith@company.com (QC Lead) - Last: 1h ago      │ │
│                   │  │ • mike.wilson@company.com (Analyst) - Last: 3h ago     │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 5. Real-time Processing Monitor

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Processing Monitor                               🔴 Live | Last Update: 2s ago   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                   │  ⚡ Real-time Processing Status                             │
│                   │                                                             │
│                   │  📊 System Health                                           │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ 🟢 LLM Service: Healthy (98.5% uptime)                 │ │
│                   │  │ 🟢 Database: Connected (12ms latency)                  │ │
│                   │  │ 🟢 Queue: 3 processing, 24 pending                     │ │
│                   │  │ 🟡 KB Service: Degraded (high load)                    │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  🔄 Active Processing Jobs                                  │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ Job #98234 | Stage: Data Preprocessing                 │ │
│                   │  │ ████████░░ 80% | ETA: 30s                              │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ Job #98235 | Stage: LLM Call #1 (Self-Windowing)      │ │
│                   │  │ ██████░░░░ 60% | ETA: 2m                               │ │
│                   │  ├─────────────────────────────────────────────────────────┤ │
│                   │  │ Job #98236 | Stage: KB Verification                    │ │
│                   │  │ ███░░░░░░░ 30% | ETA: 3m                               │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
│                   │                                                             │
│                   │  📈 Performance Metrics (Last 24h)                         │
│                   │  ┌─────────────────────────────────────────────────────────┐ │
│                   │  │ Avg Processing Time: 4.2 minutes                       │ │
│                   │  │ Success Rate: 97.8%                                     │ │
│                   │  │ LLM Token Usage: 2.4M tokens                           │ │
│                   │  │ Peak Queue Size: 45 items                              │ │
│                   │  │                                                         │ │
│                   │  │ 📊 Hourly Throughput                                   │ │
│                   │  │     ▄▄                                                  │ │
│                   │  │   ▄▄██▄▄                                                │ │
│                   │  │ ▄▄██████▄▄                                              │ │
│                   │  │ ██████████                                              │ │
│                   │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 6. Mobile-Responsive Design Considerations

### Mobile Dashboard (320px - 768px)
```
┌─────────────────────┐
│ ☰ QC AI        🌙   │
├─────────────────────┤
│ 📊 Quick Stats      │
│ ┌─────┐ ┌─────┐     │
│ │ 78.5│ │67.2%│     │
│ │Score│ │ OK  │     │
│ └─────┘ └─────┘     │
│                     │
│ 🔍 [Search...]      │
│                     │
│ 📋 Recent Items     │
│ ┌─────────────────┐ │
│ │#98231 | 73 | ⚠️ │ │
│ │Billing | Review │ │
│ ├─────────────────┤ │
│ │#98232 | 86 | ✅ │ │
│ │Support | OK     │ │
│ └─────────────────┘ │
│                     │
│ [View All] [Queue]  │
└─────────────────────┘
```

## Design System Guidelines

### Color Palette
- **Primary**: Blue (#3B82F6) for actions and links
- **Success**: Green (#10B981) for OK status
- **Warning**: Yellow (#F59E0B) for Review status  
- **Error**: Red (#EF4444) for Not OK status
- **Neutral**: Gray scale for backgrounds and text

### Typography
- **Headers**: Geist Sans, 24px-32px, semibold
- **Body**: Geist Sans, 14px-16px, regular
- **Code**: Geist Mono, 12px-14px, monospace
- **Captions**: 12px, medium gray

### Component Patterns
- **Cards**: Rounded corners (8px), subtle shadows
- **Buttons**: Primary (filled), Secondary (outlined), Ghost
- **Status Indicators**: Colored dots/badges with text
- **Progress Bars**: Animated, color-coded by status
- **Tables**: Zebra striping, hover states, sortable headers

### Accessibility
- **WCAG 2.1 AA** compliance
- **Keyboard navigation** for all interactive elements
- **Screen reader** support with proper ARIA labels
- **High contrast** mode support
- **Focus indicators** clearly visible