import { Metadata } from 'next';
import ProjectListPage from './_components/ProjectList';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    openGraph: {
      title: `소프트스킬 팀빌딩 서비스, 팀피셜`,
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

const Page = () => {
  return <ProjectListPage />;
};

export default Page;
