import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import MobileOverlayWrapper from '@/components/layout/MobileOverlayWrapper';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="desktop:max-w-[1024px] desktop:px-10 desktop:min-h-[calc(100vh-65px)] mx-auto w-full max-w-[640px] px-4">
        <MobileOverlayWrapper>{children}</MobileOverlayWrapper>
      </main>
      <div className="tablet:block hidden">
        <Footer />
      </div>
    </>
  );
}
