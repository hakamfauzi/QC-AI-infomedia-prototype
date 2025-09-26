'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarNav } from '@/components/SidebarNav';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login page layout (no sidebar)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Show authenticated layout with sidebar
  return (
    <div className="min-h-dvh grid grid-cols-[260px_1fr]">
      <aside className="border-r border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="h-14 flex items-center px-4 font-semibold tracking-wide">
          Agentic QC AI
        </div>
        <SidebarNav />
      </aside>
      <main className="min-h-dvh bg-neutral-50">
        <header className="h-14 border-b border-neutral-200 flex items-center justify-between px-4 sticky top-0 bg-neutral-50/80 backdrop-blur z-10">
          <div className="text-sm text-neutral-500">Filters • Time · Bot · Team</div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-neutral-400">
              Welcome, {user?.name || user?.email}
            </div>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Logout
            </button>
            <div className="text-xs text-neutral-400">Prototype v1</div>
          </div>
        </header>
        <div className="p-4 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ConditionalLayout;