"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Target, 
  Zap, 
  CheckCircle,
  AlertTriangle,
  Play,
  Save,
  RotateCcw
} from "lucide-react";

export default function CalibrationPage() {
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleStartCalibration = () => {
    setIsCalibrating(true);
    // Simulate calibration process
    setTimeout(() => {
      setIsCalibrating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calibration</h1>
          <p className="text-muted-foreground">
            Configure and calibrate QC evaluation parameters
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Calibration Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calibration Status</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Calibrated</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last calibrated: 2 hours ago
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.8%</span> from last calibration
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.89</div>
            <p className="text-xs text-muted-foreground">
              High confidence threshold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calibration Tabs */}
      <Tabs defaultValue="parameters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parameters" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Scoring Parameters</CardTitle>
                <CardDescription>Configure evaluation scoring weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accuracy-weight">Accuracy Weight</Label>
                  <Input id="accuracy-weight" type="number" defaultValue="0.4" step="0.1" min="0" max="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completeness-weight">Completeness Weight</Label>
                  <Input id="completeness-weight" type="number" defaultValue="0.3" step="0.1" min="0" max="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relevance-weight">Relevance Weight</Label>
                  <Input id="relevance-weight" type="number" defaultValue="0.3" step="0.1" min="0" max="1" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>LLM model settings and parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" defaultValue="0.2" step="0.1" min="0" max="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input id="max-tokens" type="number" defaultValue="1000" step="100" min="100" max="4000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input id="top-p" type="number" defaultValue="0.9" step="0.1" min="0" max="1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="thresholds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Thresholds</CardTitle>
              <CardDescription>Set minimum thresholds for different quality metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pass-threshold">Pass Threshold</Label>
                    <Input id="pass-threshold" type="number" defaultValue="70" min="0" max="100" />
                    <p className="text-xs text-muted-foreground">Minimum score to pass QC</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-threshold">Review Threshold</Label>
                    <Input id="review-threshold" type="number" defaultValue="60" min="0" max="100" />
                    <p className="text-xs text-muted-foreground">Score below which requires human review</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                    <Input id="confidence-threshold" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
                    <p className="text-xs text-muted-foreground">Minimum confidence for automated decisions</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kb-match-threshold">KB Match Threshold</Label>
                    <Input id="kb-match-threshold" type="number" defaultValue="0.85" step="0.05" min="0" max="1" />
                    <p className="text-xs text-muted-foreground">Minimum similarity for knowledge base matches</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calibration Validation</CardTitle>
              <CardDescription>Test current calibration against validation dataset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Run Calibration Test</h4>
                    <p className="text-sm text-muted-foreground">
                      Test current parameters against 100 validation samples
                    </p>
                  </div>
                  <Button 
                    onClick={handleStartCalibration}
                    disabled={isCalibrating}
                  >
                    {isCalibrating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Test
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Validation Results */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">94.2%</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Precision</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">91.8%</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Recall</span>
                    </div>
                    <div className="text-2xl font-bold mt-2">89.5%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calibration History</CardTitle>
              <CardDescription>Previous calibration runs and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-01-15 14:30", accuracy: "94.2%", status: "success" },
                  { date: "2024-01-14 09:15", accuracy: "92.4%", status: "success" },
                  { date: "2024-01-13 16:45", accuracy: "89.1%", status: "warning" },
                  { date: "2024-01-12 11:20", accuracy: "91.8%", status: "success" },
                ].map((run, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {run.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm font-medium">{run.date}</span>
                      </div>
                      <Badge variant={run.status === "success" ? "default" : "secondary"}>
                        {run.accuracy}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}