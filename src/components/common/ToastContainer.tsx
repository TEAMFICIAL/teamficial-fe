'use client';

import { ToastMessage } from '@/contexts/ToastContext';

export default function ToastContainer({ toast }: { toast: ToastMessage }) {
  const base =
    toast.type === 'success'
      ? 'bg-green-500 text-white'
      : toast.type === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-gray-0 text-gray-700';

  return (
    <div className={`${base} w-[383px] rounded-[58px] px-8 py-4 text-center`}>{toast.message}</div>
  );
}
