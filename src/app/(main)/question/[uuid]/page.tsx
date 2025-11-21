import React from 'react';
import QuestionTemplate from './_components/QuestionTemplate';
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
    title: `${userName}님의 팀피셜록을 작성해볼까요?`,
    description: `${userName}님에 대해 자유롭게 작성해보세요!`,
    openGraph: {
      title: `${userName}님의 팀피셜록을 작성해볼까요?`,
      description: `${userName}님에 대해 자유롭게 작성해보세요!`,
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

const page = async ({ params }: Props) => {
  const { uuid } = await params;

  return (
    <main className="-mx-10 mt-5 bg-gray-100">
      <QuestionTemplate uuid={uuid} />
    </main>
  );
};

export default page;
