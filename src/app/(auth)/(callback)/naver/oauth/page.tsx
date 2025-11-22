import { Suspense } from 'react';
import NaverCallbackClient from './NaverCallback';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500" />
        </div>
      }
    >
      <NaverCallbackClient />
    </Suspense>
  );
}
