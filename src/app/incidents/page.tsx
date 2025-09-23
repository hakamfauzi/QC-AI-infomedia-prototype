"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  User,
  Calendar
} from "lucide-react";

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground">
            Track and manage QC incidents and system issues
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Incident Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Being investigated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.3h</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create Incident Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Report New Incident</CardTitle>
            <CardDescription>Provide details about the incident</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="incident-title">Title</Label>
                <Input id="incident-title" placeholder="Brief description of the incident" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incident-severity">Severity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="incident-description">Description</Label>
                <Textarea id="incident-description" placeholder="Detailed description of the incident" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incident-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="data">Data Quality</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="user">User Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="incident-component">Affected Component</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qc-engine">QC Engine</SelectItem>
                    <SelectItem value="knowledge-base">Knowledge Base</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="ui">User Interface</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateForm(false)}>
                Create Incident
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incidents Management */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Incidents</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Search incidents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Active Incidents List */}
          <div className="space-y-4">
            {[
              {
                id: "INC-001",
                title: "QC Engine Performance Degradation",
                severity: "high",
                status: "investigating",
                category: "performance",
                assignee: "John Doe",
                created: "2024-01-15 14:30",
                updated: "2024-01-15 16:45",
                description: "QC evaluation times have increased by 40% since this morning"
              },
              {
                id: "INC-002",
                title: "Knowledge Base Search Returning Empty Results",
                severity: "critical",
                status: "open",
                category: "system",
                assignee: "Jane Smith",
                created: "2024-01-15 13:15",
                updated: "2024-01-15 13:15",
                description: "Search functionality in knowledge base is not working"
              },
              {
                id: "INC-003",
                title: "Incorrect Score Calculations for Team B",
                severity: "medium",
                status: "in_progress",
                category: "data",
                assignee: "Mike Johnson",
                created: "2024-01-15 11:20",
                updated: "2024-01-15 15:30",
                description: "QC scores for Team B evaluations appear to be consistently lower than expected"
              },
            ].map((incident, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{incident.id}: {incident.title}</h4>
                        <Badge variant={incident.severity === "critical" ? "destructive" : incident.severity === "high" ? "destructive" : incident.severity === "medium" ? "default" : "secondary"}>
                          {incident.severity}
                        </Badge>
                        <Badge variant="outline">{incident.status.replace('_', ' ')}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{incident.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Created: {incident.created}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Updated: {incident.updated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Incidents</CardTitle>
              <CardDescription>Recently resolved incidents and their solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "INC-098",
                    title: "API Rate Limiting Issues",
                    severity: "medium",
                    resolvedBy: "Alice Brown",
                    resolvedAt: "2024-01-15 12:30",
                    resolutionTime: "2.5h",
                    solution: "Increased rate limits and optimized API calls"
                  },
                  {
                    id: "INC-097",
                    title: "Dashboard Loading Timeout",
                    severity: "low",
                    resolvedBy: "Bob Wilson",
                    resolvedAt: "2024-01-15 10:15",
                    resolutionTime: "1.2h",
                    solution: "Optimized database queries and added caching"
                  },
                ].map((incident, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium">{incident.id}: {incident.title}</h5>
                        <Badge variant="outline">{incident.severity}</Badge>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.solution}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Resolved by: {incident.resolvedBy}</span>
                        <span>Time: {incident.resolutionTime}</span>
                        <span>At: {incident.resolvedAt}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>Incident volume and resolution trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Incident trends chart placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Incidents by category and severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "System", count: 15, critical: 2, high: 5, medium: 6, low: 2 },
                    { category: "Performance", count: 12, critical: 1, high: 3, medium: 5, low: 3 },
                    { category: "Data Quality", count: 8, critical: 0, high: 2, medium: 4, low: 2 },
                    { category: "Security", count: 3, critical: 1, high: 1, medium: 1, low: 0 },
                  ].map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{cat.category}</span>
                        <Badge variant="outline">{cat.count} total</Badge>
                      </div>
                      <div className="flex space-x-2 text-xs">
                        <Badge variant="destructive">{cat.critical} Critical</Badge>
                        <Badge variant="destructive">{cat.high} High</Badge>
                        <Badge variant="default">{cat.medium} Medium</Badge>
                        <Badge variant="secondary">{cat.low} Low</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}