import React from 'react';
import QuestionTemplate from './_components/QuestionTemplate';
import { Metadata } from 'next';
import axios from 'axios';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/teamficial-log/requester`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      requesterUuid: uuid,
    },
  });

  const data = res.data;
  const userName = data?.result?.requesterName ?? '사용자';

  return {
    title: `${userName}님의 팀피셜록을 작성해볼까요?`,
    openGraph: {
      title: `${userName}님의 팀피셜록을 작성해볼까요?`,
      images: [
        {
          url: '/og/Teamficial-metatag_Image.jpg',
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
