'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { useIsMobile } from '@/hooks/useIsMobile';

// 오버레이 경로 패턴 정의
// 필요 시 패턴 추가
const OVERLAY_ROUTES = [
  /^\/teampsylog\/head\/[^/]+$/, // /teampsylog/head/:uuid
  /^\/question\/[^/]+$/, // /question/:uuid
  /^\/teampsylog\/[^/]+$/, // /teampsylog/:uuid
  /^\/teampsylog$/, // /teampsylog
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
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

  // 기본 레이아웃
  return (
    <>
      <Header />
      <main className="desktop:max-w-[1024px] desktop:px-10 desktop:min-h-[calc(100vh-65px)] mx-auto w-full max-w-[640px] px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
