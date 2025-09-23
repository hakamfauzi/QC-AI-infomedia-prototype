"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  TrendingUp, 
  TrendingDown,
  Users,
  Bot,
  FileText,
  Zap
} from "lucide-react";
import { QCEvaluation, OverviewStats, QueueStats, SystemHealth } from "@/types";
import { EVALUATIONS, MOCK_QUEUE_STATS, MOCK_SYSTEM_HEALTH, computeOverviewStats } from "@/lib/mock";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  icon: React.ReactNode;
  status?: "positive" | "negative" | "neutral";
}

function MetricCard({ title, value, description, trend, icon, status = "neutral" }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusColor = () => {
    switch (status) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={getStatusColor()}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend !== undefined && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
            {getTrendIcon()}
            <span>{Math.abs(trend)}% from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface SystemStatusProps {
  health: SystemHealth;
}

function SystemStatus({ health }: SystemStatusProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
        return <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>;
      case "degraded":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case "down":
        return <Badge variant="destructive">Down</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>System Health</span>
        </CardTitle>
        <CardDescription>Real-time system component status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span className="text-sm">LLM Service</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(health.llm_service.status)}
            <span className="text-xs text-muted-foreground">
              {health.llm_service.response_time_ms}ms
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="text-sm">Database</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(health.database.status)}
            <span className="text-xs text-muted-foreground">
              {health.database.latency_ms}ms
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Processing Queue</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(health.queue.status)}
            <span className="text-xs text-muted-foreground">
              {health.queue.pending_count} pending
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Knowledge Base</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(health.kb_service.status)}
            <span className="text-xs text-muted-foreground">
              {health.kb_service.index_size} docs
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QueueOverviewProps {
  stats: QueueStats;
}

function QueueOverview({ stats }: QueueOverviewProps) {
  const totalItems = stats.pending + stats.processing + stats.completed + stats.failed;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Processing Queue</span>
        </CardTitle>
        <CardDescription>Current queue status and performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="font-medium">{stats.pending}</span>
            </div>
            <Progress value={(stats.pending / totalItems) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Processing</span>
              <span className="font-medium">{stats.processing}</span>
            </div>
            <Progress value={(stats.processing / totalItems) * 100} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Processing Time</span>
            <span className="font-medium">{stats.avgProcessingTime}h</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-muted-foreground">SLA Breaches</span>
            <span className="font-medium text-orange-600">{stats.slaBreaches}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [recentEvaluations, setRecentEvaluations] = useState<QCEvaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const evaluations = EVALUATIONS.slice(0, 10); // Get recent 10
      const overviewStats = computeOverviewStats(EVALUATIONS);
      
      setRecentEvaluations(evaluations);
      setStats(overviewStats);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QC AI Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor quality control evaluations and system performance
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Key Metrics */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard
            title="Average Score"
            value={stats.avgScore}
            description="Overall quality score"
            trend={stats.trends.avgScore}
            icon={<TrendingUp className="h-4 w-4" />}
            status={stats.trends.avgScore > 0 ? "positive" : "negative"}
          />
          <MetricCard
            title="OK Rate"
            value={`${stats.okPct}%`}
            description="Conversations passing QC"
            trend={stats.trends.okPct}
            icon={<CheckCircle className="h-4 w-4" />}
            status={stats.trends.okPct > 0 ? "positive" : "negative"}
          />
          <MetricCard
            title="Coverage"
            value={`${stats.coverage}%`}
            description="Parameter coverage"
            trend={stats.trends.coverage}
            icon={<Activity className="h-4 w-4" />}
            status={stats.trends.coverage > 0 ? "positive" : "negative"}
          />
          <MetricCard
            title="KB Verification"
            value={`${stats.kbVerify}%`}
            description="Knowledge base verified"
            trend={stats.trends.kbVerify}
            icon={<Database className="h-4 w-4" />}
            status={stats.trends.kbVerify > 0 ? "positive" : "negative"}
          />
          <MetricCard
            title="Avg TAT"
            value={`${stats.qcTATHours}h`}
            description="Turnaround time"
            trend={stats.trends.qcTATHours}
            icon={<Clock className="h-4 w-4" />}
            status={stats.trends.qcTATHours < 0 ? "positive" : "negative"}
          />
        </div>
      )}

      {/* System Status and Queue Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <SystemStatus health={MOCK_SYSTEM_HEALTH} />
        <QueueOverview stats={MOCK_QUEUE_STATS} />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Evaluations</CardTitle>
          <CardDescription>Latest QC evaluation results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">#{evaluation.id}</span>
                  </div>
                  <Badge variant={evaluation.final_status === "OK" ? "default" : "destructive"}>
                    {evaluation.final_status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Score: {evaluation.score}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {evaluation.created_at.toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}