'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient(),
      // TODO: queryClient 설정 추가
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
