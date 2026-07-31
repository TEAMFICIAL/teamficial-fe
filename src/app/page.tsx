import { LandingPage } from '@/components/landing/LandingPage';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `TEAMFICIAL`,
    description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    openGraph: {
      title: `TEAMFICIAL`,
      description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
      images: [
        {
          url: 'https://www.teamficial.com/og/Teamficial_metatag_Image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function RootPage() {
  return <LandingPage />;
}
