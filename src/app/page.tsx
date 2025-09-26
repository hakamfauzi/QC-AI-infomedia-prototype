'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function Home() {
  const { isAuthenticated, login } = useAuth();

  // Handle successful login
  const handleLoginSuccess = async (email: string, password: string, remember: boolean) => {
    return await login(email, password, remember);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  // Show dashboard if authenticated
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardOverview />
    </div>
  );
}
 
