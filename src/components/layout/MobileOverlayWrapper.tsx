'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ReactNode } from 'react';

// 오버레이 경로 패턴 정의
const OVERLAY_ROUTES = [
  /^\/teampsylog\/head\/[^/]+$/, // /teampsylog/head/:uuid
  /^\/question\/[^/]+$/, // /question/:uuid
  /^\/teampsylog\/[^/]+$/, // /teampsylog/:uuid
  /^\/teampsylog$/, // /teampsylog
  /^\/recruit$/, // /recruit
  /^\/mypage\/profile$/, // /mypage/profile
  /^\/mypage\/profile\/edit\/[^/]+$/, // /mypage/profile/edit/:profileId
  /^\/project\/all$/, // /project/all
  /^\/mypage\/applicant$/, // /mypage/applicant
  /^\/mypage\/applied$/, // /mypage/applied
  /^\/mypage\/team$/, // /mypage/team
  /^\/mypage\/team\/[^/]+$/, // /mypage/team/:id
];

interface MobileOverlayWrapperProps {
  children: ReactNode;
}

function MobileOverlayWrapperContent({ children }: MobileOverlayWrapperProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const shouldShowOverlay = isMobile && OVERLAY_ROUTES.some((pattern) => pattern.test(pathname));

  if (shouldShowOverlay) {
    return (
      <div className="max-desktop:flex fixed inset-0 z-50 hidden">
        <div className="w-full overflow-y-auto bg-white px-4">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MobileOverlayWrapper({ children }: MobileOverlayWrapperProps) {
  return (
    <Suspense fallback={null}>
      <MobileOverlayWrapperContent>{children}</MobileOverlayWrapperContent>
    </Suspense>
  );
}
