'use client';

import { ToastMessage } from '@/contexts/ToastContext';
import DefaultToast from './DefaultToast';
import ErrorToast from './ErrorToast';
import SuccessToast from './SuccessToast';

export default function ToastContainer({ toast }: { toast: ToastMessage }) {
  if (toast.type === 'success') return <SuccessToast message={toast.message} />;
  if (toast.type === 'error') return <ErrorToast title={toast.title} message={toast.message} />;
  return <DefaultToast message={toast.message} />;
}
