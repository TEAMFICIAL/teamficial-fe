import React from 'react';
import KeywordListPage from './_components/KeywordListPage';
import MobileHeader from '@/components/common/MobileHeader';
import { Metadata } from 'next';
import axios from 'axios';

type Props = {
  params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  let userName = '사용자';

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teamficial-log/requester`,
      {
        params: {
          requesterUuid: uuid,
        },
      },
    );

    userName = res.data?.result?.requesterName ?? '사용자';
  } catch (error) {
    console.error('Failed to fetch requester data:', error);
  }

  return {
    title: `${userName}님의 팀피셜록`,
    description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    openGraph: {
      title: `${userName}님의 팀피셜록`,
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

const page = () => {
  return (
    <>
      <MobileHeader title="팀피셜록" />
      <KeywordListPage />
    </>
  );
};

export default page;
