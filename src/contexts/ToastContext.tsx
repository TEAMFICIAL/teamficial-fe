'use client';

import ToastContainer from '@/components/common/ToastContainer';
import { createContext, useContext, useState, useCallback } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'default';
  duration?: number;
}

interface ToastContextType {
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = (() => {
      try {
        return crypto.randomUUID();
      } catch {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
    })();

    const newToast: ToastMessage = {
      id,
      duration: 2000,
      type: 'default',
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const isVisible = toasts.length > 0;

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {isVisible && <div className="pointer-events-none fixed inset-0 z-[9997] bg-black/70" />}

      <div className="fixed bottom-[56px] left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center">
        {toasts.map((t) => (
          <div key={t.id} className="mb-2">
            <ToastContainer toast={t} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastProvider가 필요합니다');
  return ctx;
};
