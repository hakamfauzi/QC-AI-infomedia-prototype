"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Play, 
  Pause, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Bot,
  Users,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import { QCEvaluation, Priority } from "@/types";
import { filterEvaluations, MOCK_BOTS, MOCK_TEAMS } from "@/lib/mock";

interface QCQueueFilters {
  search: string;
  bot: string;
  team: string;
  status: string;
  priority: string;
  dateFrom: string;
  dateTo: string;
}

interface QCQueueProps {
  onEvaluationSelect?: (evaluation: QCEvaluation) => void;
}

export default function QCQueue({ onEvaluationSelect }: QCQueueProps) {
  const [evaluations, setEvaluations] = useState<QCEvaluation[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<QCEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<QCQueueFilters>({
    search: "",
    bot: "all",
    team: "all",
    status: "all",
    priority: "all",
    dateFrom: "",
    dateTo: ""
  });

  const loadEvaluations = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const allEvaluations = filterEvaluations({
      bot: filters.bot === "all" ? undefined : filters.bot,
      team: filters.team === "all" ? undefined : filters.team,
      status: filters.status === "all" ? undefined : filters.status,
      priority: filters.priority === "all" ? undefined : filters.priority,
      from: filters.dateFrom || undefined,
      to: filters.dateTo || undefined,
      search: filters.search || undefined
    });
    
    setEvaluations(allEvaluations);
    setFilteredEvaluations(allEvaluations);
    setLoading(false);
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadEvaluations();
    setRefreshing(false);
  };

  useEffect(() => {
    loadEvaluations();
  }, [filters]);

  const handleFilterChange = (key: keyof QCQueueFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      bot: "all",
      team: "all",
      status: "all",
      priority: "all",
      dateFrom: "",
      dateTo: ""
    });
  };

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

  const getProcessingTime = (evaluation: QCEvaluation) => {
    if (evaluation.completed_at) {
      const diff = evaluation.completed_at.getTime() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h`;
    }
    if (evaluation.status === "processing") {
      const diff = Date.now() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h (ongoing)`;
    }
    return "-";
  };

  const pendingEvaluations = filteredEvaluations.filter(e => e.status === "pending");
  const processingEvaluations = filteredEvaluations.filter(e => e.status === "processing");
  const completedEvaluations = filteredEvaluations.filter(e => e.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QC Queue</h1>
          <p className="text-muted-foreground">
            Manage and monitor quality control evaluations
          </p>
        </div>
        <Button onClick={refreshData} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by ID or bot..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bot</Label>
              <Select value={filters.bot} onValueChange={(value) => handleFilterChange("bot", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All bots" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All bots</SelectItem>
                  {MOCK_BOTS.map(bot => (
                    <SelectItem key={bot} value={bot}>{bot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Team</Label>
              <Select value={filters.team} onValueChange={(value) => handleFilterChange("team", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All teams</SelectItem>
                  {MOCK_TEAMS.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All ({filteredEvaluations.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingEvaluations.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({processingEvaluations.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedEvaluations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <EvaluationTable 
            evaluations={filteredEvaluations} 
            loading={loading}
            onEvaluationSelect={onEvaluationSelect}
          />
        </TabsContent>

        <TabsContent value="pending">
          <EvaluationTable 
            evaluations={pendingEvaluations} 
            loading={loading}
            onEvaluationSelect={onEvaluationSelect}
          />
        </TabsContent>

        <TabsContent value="processing">
          <EvaluationTable 
            evaluations={processingEvaluations} 
            loading={loading}
            onEvaluationSelect={onEvaluationSelect}
          />
        </TabsContent>

        <TabsContent value="completed">
          <EvaluationTable 
            evaluations={completedEvaluations} 
            loading={loading}
            onEvaluationSelect={onEvaluationSelect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EvaluationTableProps {
  evaluations: QCEvaluation[];
  loading: boolean;
  onEvaluationSelect?: (evaluation: QCEvaluation) => void;
}

function EvaluationTable({ evaluations, loading, onEvaluationSelect }: EvaluationTableProps) {
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

  const getProcessingTime = (evaluation: QCEvaluation) => {
    if (evaluation.completed_at) {
      const diff = evaluation.completed_at.getTime() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h`;
    }
    if (evaluation.status === "processing") {
      const diff = Date.now() - evaluation.created_at.getTime();
      const hours = Math.round(diff / (1000 * 60 * 60) * 10) / 10;
      return `${hours}h (ongoing)`;
    }
    return "-";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Conversation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Final Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Processing Time</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  No evaluations found
                </TableCell>
              </TableRow>
            ) : (
              evaluations.map((evaluation) => (
                <TableRow key={evaluation.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">#{evaluation.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{evaluation.conversation_id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                  <TableCell>{getFinalStatusBadge(evaluation.final_status)}</TableCell>
                  <TableCell>{getPriorityBadge(evaluation.priority)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{evaluation.score}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{evaluation.coverage_percentage}%</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{getProcessingTime(evaluation)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {evaluation.created_at.toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEvaluationSelect?.(evaluation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {evaluation.status === "pending" && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {evaluation.status === "processing" && (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}