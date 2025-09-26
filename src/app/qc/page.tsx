"use client";

import { useState } from "react";
import QCQueue from "@/components/qc/qc-queue";
import ConversationDetail from "@/components/qc/conversation-detail";
import ProtectedRoute from "@/components/ProtectedRoute";
import { QCEvaluation } from "@/types";

export default function QCPage() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<QCEvaluation | null>(null);

  const handleEvaluationSelect = (evaluation: QCEvaluation) => {
    setSelectedEvaluation(evaluation);
  };

  const handleBack = () => {
    setSelectedEvaluation(null);
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {selectedEvaluation ? (
          <ConversationDetail 
            evaluation={selectedEvaluation} 
            onBack={handleBack}
          />
        ) : (
          <QCQueue onEvaluationSelect={handleEvaluationSelect} />
        )}
      </div>
    </ProtectedRoute>
  );
}