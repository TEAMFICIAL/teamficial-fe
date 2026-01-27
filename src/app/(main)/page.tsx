import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    openGraph: {
      title: `소프트스킬 팀빌딩 서비스, 팀피셜`,
      description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
      images: [
        {
          url: '/og/Teamficial_metatag_Image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function RootPage() {
  redirect('/project');
}
