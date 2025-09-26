"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  Shuffle, 
  Target, 
  BarChart3, 
  Settings,
  Play,
  Download,
  RefreshCw,
  CheckCircle,
  Clock
} from "lucide-react";

export default function SamplingPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSample = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sampling</h1>
          <p className="text-muted-foreground">
            Configure sampling strategies and generate representative datasets
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Sample
          </Button>
          <Button onClick={handleGenerateSample} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Shuffle className="mr-2 h-4 w-4" />
                Generate Sample
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Sampling Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Population</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,847</div>
            <p className="text-xs text-muted-foreground">
              Available conversations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sample Size</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
            <p className="text-xs text-muted-foreground">
              Current sample target
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              Population coverage
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Generated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">
              ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sampling Configuration */}
      <Tabs defaultValue="strategy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategy" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sampling Method</CardTitle>
                <CardDescription>Choose the sampling strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sampling-method">Method</Label>
                  <Select defaultValue="stratified">
                    <SelectTrigger>
                      <SelectValue placeholder="Select sampling method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Random Sampling</SelectItem>
                      <SelectItem value="stratified">Stratified Sampling</SelectItem>
                      <SelectItem value="systematic">Systematic Sampling</SelectItem>
                      <SelectItem value="cluster">Cluster Sampling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sample-size">Sample Size</Label>
                  <Input id="sample-size" type="number" defaultValue="500" min="10" max="5000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confidence-level">Confidence Level</Label>
                  <Select defaultValue="95">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                      <SelectItem value="99">99%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stratification</CardTitle>
                <CardDescription>Configure stratification parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Stratify by Bot</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Billing Bot</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Bot</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Bot</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Stratify by Team</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Team A</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team B</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team C</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Population Filters</CardTitle>
              <CardDescription>Apply filters to define the sampling population</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Date Range - From</Label>
                    <Input id="date-from" type="date" defaultValue="2024-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-to">Date Range - To</Label>
                    <Input id="date-to" type="date" defaultValue="2024-01-31" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bot-filter">Bot Filter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bots" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Bots</SelectItem>
                        <SelectItem value="billing">Billing Bot</SelectItem>
                        <SelectItem value="support">Support Bot</SelectItem>
                        <SelectItem value="sales">Sales Bot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-filter">Team Filter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teams" />
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
                    <Label htmlFor="score-min">Minimum Score</Label>
                    <Input id="score-min" type="number" defaultValue="0" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="score-max">Maximum Score</Label>
                    <Input id="score-max" type="number" defaultValue="100" min="0" max="100" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Results</CardTitle>
              <CardDescription>Generated sample and distribution analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sample Statistics */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Sample Size</div>
                    <div className="text-2xl font-bold">500</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Avg Score</div>
                    <div className="text-2xl font-bold">78.3</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Std Deviation</div>
                    <div className="text-2xl font-bold">12.4</div>
                  </div>
                </div>
                
                {/* Distribution Chart Placeholder */}
                <div className="h-[300px] border rounded-lg flex items-center justify-center text-muted-foreground">
                  Sample distribution chart placeholder
                </div>
                
                {/* Sample Items Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium">Sample Preview (First 5 items)</h4>
                  <div className="space-y-2">
                    {[
                      { id: "#98231", bot: "Billing Bot", team: "Team A", score: 85 },
                      { id: "#98245", bot: "Support Bot", team: "Team B", score: 72 },
                      { id: "#98267", bot: "Sales Bot", team: "Team C", score: 91 },
                      { id: "#98289", bot: "Billing Bot", team: "Team B", score: 68 },
                      { id: "#98301", bot: "Support Bot", team: "Team A", score: 79 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{item.id}</span>
                          <Badge variant="outline">{item.bot}</Badge>
                          <Badge variant="secondary">{item.team}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Score: {item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sampling History</CardTitle>
              <CardDescription>Previous sampling runs and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-01-15 14:30", method: "Stratified", size: 500, coverage: "3.2%" },
                  { date: "2024-01-14 09:15", method: "Random", size: 300, coverage: "1.9%" },
                  { date: "2024-01-13 16:45", method: "Systematic", size: 750, coverage: "4.7%" },
                  { date: "2024-01-12 11:20", method: "Stratified", size: 400, coverage: "2.5%" },
                ].map((run, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{run.date}</span>
                      </div>
                      <Badge variant="outline">{run.method}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Size: {run.size} | Coverage: {run.coverage}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Rerun
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </ProtectedRoute>
  );
}