"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ToastProvider";
import { MOCK_BOTS, MOCK_TEAMS } from "@/lib/mock";

interface FormData {
  bot: string;
  team: string;
  priority: "low" | "medium" | "high" | "critical";
  excelFile: File | null;
}

export default function SubmitPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    bot: "",
    team: "",
    priority: "medium",
    excelFile: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, excelFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.bot || !formData.team || !formData.excelFile) {
        throw new Error("Please fill in all required fields and upload an Excel file");
      }

      // Validate file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (!allowedTypes.includes(formData.excelFile.type)) {
        throw new Error("Please upload a valid Excel file (.xlsx or .xls)");
      }

      // Validate file size (max 10MB)
      if (formData.excelFile.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      const formDataToSend = new FormData();
      formDataToSend.append('excelFile', formData.excelFile);
      formDataToSend.append('bot', formData.bot);
      formDataToSend.append('team', formData.team);
      formDataToSend.append('priority', formData.priority);

      const response = await fetch("/api/evaluations", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit evaluation");
      }

      addToast({
        title: "Success",
        description: "Excel file uploaded and QC evaluation submitted successfully",
      });

      router.push("/qc");
    } catch (error) {
      addToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit evaluation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Submit New QC Evaluation</h1>
        <p className="text-muted-foreground mt-2">
          Submit a new conversation for quality control analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Select the bot and team for this evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bot">Bot</Label>
                <Select
                  value={formData.bot}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bot: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bot" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_BOTS.map((bot) => (
                      <SelectItem key={bot} value={bot}>
                        {bot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select
                  value={formData.team}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, team: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_TEAMS.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high" | "critical") => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Excel File Upload</CardTitle>
            <CardDescription>
              Upload an Excel file containing conversation data for QC analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="excelFile">Excel File *</Label>
              <Input
                id="excelFile"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Upload an Excel file (.xlsx or .xls) containing conversation data. Maximum file size: 10MB.
              </p>
              {formData.excelFile && (
                <div className="text-sm text-green-600">
                  Selected file: {formData.excelFile.name} ({(formData.excelFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for QC Analysis"}
          </Button>
        </div>
      </form>
    </div>
  );
}