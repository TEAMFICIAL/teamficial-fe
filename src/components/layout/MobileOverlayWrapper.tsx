'use client';

import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ReactNode } from 'react';

// 오버레이 경로 패턴 정의
const OVERLAY_ROUTES = [
  /^\/teampsylog\/head\/[^/]+$/, // /teampsylog/head/:uuid
  /^\/question\/[^/]+$/, // /question/:uuid
];

interface MobileOverlayWrapperProps {
  children: ReactNode;
}

export default function MobileOverlayWrapper({ children }: MobileOverlayWrapperProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const shouldShowOverlay = isMobile && OVERLAY_ROUTES.some((pattern) => pattern.test(pathname));

  if (shouldShowOverlay) {
    return (
      <main className="fixed inset-0 z-50 flex">
        <div className="w-full overflow-y-auto bg-white px-4">{children}</div>
      </main>
    );
  }

  return <>{children}</>;
}
