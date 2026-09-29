'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  subtitle?: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error', subtitle?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success', subtitle?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, subtitle }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-[#121216] text-[#FAF9F6] border border-[#26262F] shadow-2xl shadow-black/80 transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="mt-0.5 text-[#FF3B8A]">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#FF3B8A]" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#FF5DA2]" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#FF3B8A]" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs tracking-wider uppercase font-medium text-white">{toast.message}</p>
              {toast.subtitle && (
                <p className="text-xs text-zinc-400 mt-0.5 font-light">{toast.subtitle}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-[#FF3B8A] transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
