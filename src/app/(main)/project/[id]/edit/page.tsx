import React from 'react';
import FormEditor from './_components/FormEditor';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const postId = Number(id);

  return (
    <>
      {/* TODO: 라이팅 확인 */}
      <div className="flex flex-col pt-7 pb-5">
        <p className="title-2 text-gray-900">팀원 모집글 수정</p>
        <p className="body-6 text-gray-700">게시글을 수정하여 원하는 분야의 팀원을 모집해보세요</p>
      </div>
      <FormEditor postId={postId} />
    </>
  );
};

export default page;
