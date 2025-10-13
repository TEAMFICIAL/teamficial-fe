import Header from '@/components/common/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-256 px-10">{children}</main>
    </>
  );
}
