import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
// @ts-expect-error Next.js handles global CSS side-effect imports at build time.
import './globals.css';
import { ModalProvider } from '@/contexts/ModalContext';
import Providers from './provider';
import { ToastProvider } from '@/contexts/ToastContext';
import KakaoScript from '@/components/common/KaKaoScript';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'TEAMFICIAL',
  description: '소프트스킬 팀빌딩 서비스, 팀피셜',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </Providers>
        <GoogleTagManager gtmId="GTM-5KPSS9WV" />
        <KakaoScript />
      </body>
    </html>
  );
}
