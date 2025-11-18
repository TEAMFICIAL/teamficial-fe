import React from 'react';
import QuestionTemplate from './_components/QuestionTemplate';

type Props = {
  params: Promise<{ uuid: string }>;
};

const page = async ({ params }: Props) => {
  const { uuid } = await params;
  return (
    <main className="-mx-10 mt-5 bg-gray-100">
      <QuestionTemplate uuid={uuid} />
    </main>
  );
};

export default page;
