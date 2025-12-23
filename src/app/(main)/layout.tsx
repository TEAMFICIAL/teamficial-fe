'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // 'use client' 삭제하고 헤더에서 사용할 수 있도록 수정
  const pathname = usePathname();
  const shouldHideHeader = pathname.includes('/mobile');

  return (
    <>
      {shouldHideHeader ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          <main className="desktop:max-w-[1024px] desktop:px-10 desktop:min-h-[calc(100vh-65px)] mx-auto w-full max-w-[640px] px-4">
            {children}
          </main>
        </>
      )}
      <Footer />
    </>
  );
}
