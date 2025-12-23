import Header from '@/components/common/Header';
import MobileHeader from '@/components/common/MobileHeader';

export default function ProjectAllLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileHeader title="프로젝트" />
      <div className="tablet:block hidden">
        <Header />
      </div>
      <main className="desktop:max-w-[1024px] desktop:px-10 desktop:min-h-[calc(100vh-65px)] mx-auto w-full max-w-[640px] bg-gray-100 px-4">
        {children}
      </main>
    </>
  );
}
