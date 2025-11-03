import Header from '@/components/common/Header';
import Providers from './provider';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      <main className="mx-auto w-full max-w-[1024px] px-10 pb-14">{children}</main>
    </Providers>
  );
}
