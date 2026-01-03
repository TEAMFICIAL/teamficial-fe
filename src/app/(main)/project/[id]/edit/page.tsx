import React from 'react';
import FormEditor from './_components/FormEditor';
import MobileHeader from '@/components/common/MobileHeader';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const postId = Number(id);

  return (
    <>
      <MobileHeader title="모집글 수정" />
      <FormEditor postId={postId} />
    </>
  );
};

export default page;
