import React from 'react';
import KeywordCard from './_components/KeywordCard';
import Button from '@/components/common/Button';
import Link from 'next/link';

type Props = {
  params: Promise<{ uuid: string }>;
};

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
