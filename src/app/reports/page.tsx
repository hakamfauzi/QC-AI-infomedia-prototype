"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  Target,
  Filter,
  Plus,
  Eye,
  Share,
  Settings
} from "lucide-react";

export default function ReportsPage() {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view QC performance reports and analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Active schedules
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads Today</CardTitle>
            <Download className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Generation Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.5s</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports with specific filters and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance Summary</SelectItem>
                  <SelectItem value="quality">Quality Metrics</SelectItem>
                  <SelectItem value="team">Team Performance</SelectItem>
                  <SelectItem value="trend">Trend Analysis</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-filter">Team</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="team-a">Team A</SelectItem>
                  <SelectItem value="team-b">Team B</SelectItem>
                  <SelectItem value="team-c">Team C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Management */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {[
              {
                id: "RPT-001",
                name: "Weekly Performance Summary",
                type: "Performance",
                createdBy: "John Doe",
                createdAt: "2024-01-15 16:30",
                size: "2.4 MB",
                format: "PDF",
                downloads: 12,
                status: "completed"
              },
              {
                id: "RPT-002",
                name: "Team A Quality Metrics - January",
                type: "Quality",
                createdBy: "Jane Smith",
                createdAt: "2024-01-15 14:15",
                size: "1.8 MB",
                format: "Excel",
                downloads: 8,
                status: "completed"
              },
              {
                id: "RPT-003",
                name: "Compliance Report Q4 2023",
                type: "Compliance",
                createdBy: "Mike Johnson",
                createdAt: "2024-01-15 11:45",
                size: "3.2 MB",
                format: "PDF",
                downloads: 25,
                status: "completed"
              },
              {
                id: "RPT-004",
                name: "Trend Analysis - Customer Satisfaction",
                type: "Trend",
                createdBy: "Alice Brown",
                createdAt: "2024-01-15 09:20",
                size: "1.5 MB",
                format: "HTML",
                downloads: 6,
                status: "generating"
              },
            ].map((report, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{report.name}</h4>
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>ID: {report.id}</span>
                        <span>Created by: {report.createdBy}</span>
                        <span>Date: {report.createdAt}</span>
                        <span>Size: {report.size}</span>
                        <span>Format: {report.format}</span>
                        <span>Downloads: {report.downloads}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically generated reports on schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Daily Performance Dashboard",
                    schedule: "Daily at 9:00 AM",
                    recipients: "team-leads@company.com",
                    format: "PDF",
                    lastRun: "2024-01-15 09:00",
                    nextRun: "2024-01-16 09:00",
                    status: "active"
                  },
                  {
                    name: "Weekly Quality Summary",
                    schedule: "Every Monday at 8:00 AM",
                    recipients: "management@company.com",
                    format: "Excel",
                    lastRun: "2024-01-15 08:00",
                    nextRun: "2024-01-22 08:00",
                    status: "active"
                  },
                  {
                    name: "Monthly Compliance Report",
                    schedule: "1st of every month at 10:00 AM",
                    recipients: "compliance@company.com",
                    format: "PDF",
                    lastRun: "2024-01-01 10:00",
                    nextRun: "2024-02-01 10:00",
                    status: "paused"
                  },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium">{schedule.name}</h5>
                        <Badge variant={schedule.status === "active" ? "default" : "secondary"}>
                          {schedule.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Schedule:</span> {schedule.schedule}
                        </div>
                        <div>
                          <span className="font-medium">Recipients:</span> {schedule.recipients}
                        </div>
                        <div>
                          <span className="font-medium">Last Run:</span> {schedule.lastRun}
                        </div>
                        <div>
                          <span className="font-medium">Next Run:</span> {schedule.nextRun}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        {schedule.status === "active" ? "Pause" : "Resume"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Performance Dashboard",
                description: "Comprehensive performance metrics and KPIs",
                category: "Performance",
                uses: 45,
                lastUsed: "2024-01-15"
              },
              {
                name: "Quality Scorecard",
                description: "Quality metrics and improvement tracking",
                category: "Quality",
                uses: 32,
                lastUsed: "2024-01-14"
              },
              {
                name: "Team Comparison",
                description: "Side-by-side team performance analysis",
                category: "Team",
                uses: 28,
                lastUsed: "2024-01-13"
              },
              {
                name: "Trend Analysis",
                description: "Historical trends and forecasting",
                category: "Analytics",
                uses: 19,
                lastUsed: "2024-01-12"
              },
              {
                name: "Compliance Summary",
                description: "Regulatory compliance and audit reports",
                category: "Compliance",
                uses: 15,
                lastUsed: "2024-01-11"
              },
              {
                name: "Executive Summary",
                description: "High-level overview for leadership",
                category: "Executive",
                uses: 12,
                lastUsed: "2024-01-10"
              },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>Used {template.uses} times</span>
                    <span>Last used: {template.lastUsed}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Usage Trends</CardTitle>
                <CardDescription>Report generation and download patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Usage trends chart placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Popular Report Types</CardTitle>
                <CardDescription>Most frequently generated report categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Performance", count: 89, percentage: 36 },
                    { type: "Quality", count: 67, percentage: 27 },
                    { type: "Team", count: 45, percentage: 18 },
                    { type: "Compliance", count: 28, percentage: 11 },
                    { type: "Analytics", count: 19, percentage: 8 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{item.count} reports</span>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Report Performance Metrics</CardTitle>
                <CardDescription>Key metrics for report generation and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3s</div>
                    <div className="text-sm text-muted-foreground">Avg Generation Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">247</div>
                    <div className="text-sm text-muted-foreground">Total Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">1,234</div>
                    <div className="text-sm text-muted-foreground">Total Downloads</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}