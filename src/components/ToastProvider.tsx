"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; title?: string; description: string };
type ToastContextType = { addToast: (t: Omit<Toast, "id">) => void };

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  
  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = idCounter;
    setIdCounter(prev => prev + 1);
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3500);
  }, [idCounter]);
  const value = useMemo(() => ({ addToast }), [addToast]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed bottom-3 right-3 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="min-w-64 max-w-96 rounded-md border border-neutral-200 bg-white/95 shadow p-3">
            {t.title ? <div className="text-sm font-medium mb-1">{t.title}</div> : null}
            <div className="text-sm text-neutral-700">{t.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}


