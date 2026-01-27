import React from 'react';
import KeywordCard from './_components/KeywordCard';
import Button from '@/components/common/Button';
import Link from 'next/link';
import axios from 'axios';
import { Metadata } from 'next';

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
    title: `${userName}님의 팀피셜록을 작성해볼까요?`,
    description: `소프트스킬 팀빌딩 서비스, 팀피셜`,
    openGraph: {
      title: `${userName}님의 팀피셜록을 작성해볼까요?`,
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

const page = async ({ params }: Props) => {
  const { uuid } = await params;

  return (
    <>
      <KeywordCard />
      <Link href={`/question/${uuid}`}>
        <Button label="팀피셜록 작성하기" className="my-7 w-full" />
      </Link>
    </>
  );
};

export default page;
