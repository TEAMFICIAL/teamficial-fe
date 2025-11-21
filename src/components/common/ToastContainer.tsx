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
    <div
      className={`${base} body-5 w-[383px] rounded-[58px] px-8 py-4 text-center shadow-[0_4px_12px_rgba(185,185,185,0.25)]`}
    >
      {toast.message}
    </div>
  );
}
