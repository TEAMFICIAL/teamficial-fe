import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-65px)] w-full max-w-[1024px] px-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
