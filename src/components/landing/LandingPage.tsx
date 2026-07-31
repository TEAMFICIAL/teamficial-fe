import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { MessageSection } from './MessageSection';

export function LandingPage() {
  return (
    <main className="flex min-h-dvh w-full flex-col">
      <HeroSection />
      <MessageSection />
      <FooterSection />
    </main>
  );
}
