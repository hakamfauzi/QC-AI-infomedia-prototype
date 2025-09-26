'use client';

import React, { useState } from 'react';

// Theming tokens via CSS variables
const themeStyles = `
  :root {
    --brand: #2563eb;
    --brand-hover: #1d4ed8;
    --brand-focus: #3b82f6;
    --text: #111827;
    --text-muted: #6b7280;
    --text-light: #9ca3af;
    --bg: #ffffff;
    --bg-muted: #f9fafb;
    --border: #e5e7eb;
    --border-focus: #d1d5db;
    --ring: #93c5fd;
    --error: #dc2626;
    --error-bg: #fef2f2;
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  global?: string;
}

interface LoginPageProps {
  onLogin?: (email: string, password: string, remember: boolean) => Promise<boolean>;
  onLoginSuccess?: () => void;
}



// Loading Spinner Component
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onLoginSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    remember: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Masukkan email yang valid';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password wajib diisi';
    if (password.length < 8) return 'Password minimal 8 karakter';
    return undefined;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear field-specific errors on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Mock login function
  const mockLogin = async (email: string, password: string, remember: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'demo@qc.ai' && password === 'demo123!') {
          console.log('Login successful', { email, remember });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };



  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let success = false;
      
      if (onLogin) {
        // Use the provided login function (from AuthContext)
        success = await onLogin(formData.email, formData.password, formData.remember);
      } else {
        // Fallback to mock login for standalone usage
        success = await mockLogin(formData.email, formData.password, formData.remember);
      }
      
      if (success) {
        console.log('Login successful, redirecting to dashboard...');
        // Call the success callback if provided
        onLoginSuccess?.();
      } else {
        setErrors({
          global: 'Email atau password salah. Silakan coba lagi.',
        });
      }
    } catch (error) {
      setErrors({
        global: 'Terjadi kesalahan. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Brand Logo */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Agentic QC AI</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Please enter your details
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Global Error */}
              {errors.global && (
                <div 
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.global}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isLoading}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors ${
                      errors.email
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600" aria-live="polite">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    disabled={isLoading}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors ${
                      errors.password
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p id="password-error" className="mt-2 text-sm text-red-600" aria-live="polite">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember for 30 days
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => console.log('go to /forgot-password')}
                    disabled={isLoading}
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading && <LoadingSpinner />}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;