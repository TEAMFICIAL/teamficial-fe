import React from 'react';
import ProjectTitle from './ProjectTitle';
import InfoCard from './InfoCard';

type Props = {
  content: string;
};

// TODO : 추후 제거 예정
const SAMPLE_CONTENT = `
  <h1>안녕하세요</h1><h2>안녕하세요</h2><h3>h3h3</h3><p>본문입니다.</p><p>이렇게 길게 <strong><em>본문이 길어지게 된다면</em></strong> 어떻게 될까요? 이렇게 길게<u> 본문이 길어지</u>게 된다면 어떻게 될까요? 이렇게 길게 본문이 길어지게 된다면 어떻게 될까요? 이렇<em>게 길게 본문이 길어지게</em> 된다면 어떻게 될까요? 이렇게 길게 본문이 길어지게 된다면 어떻게 될까요? </p><p>여러 <strong>태그를 </strong>넣어보자</p><ul class="list-disc ml-4"><li><p><strong><em>순서</em></strong></p></li><li><p>없음</p></li></ul><ol class="list-decimal ml-4"><li><p><em><u>순서</u></em></p></li><li><p>있음</p></li></ol><p></p>
`;

const ProjectInfo = ({ content = SAMPLE_CONTENT }: Props) => {
  return (
    <>
      <ProjectTitle />
      <div className="flex flex-col gap-4">
        <InfoCard />
        <div className="prose max-w-none rounded-2xl border border-gray-300 p-10 text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <p>프로필 컴포넌트 부분</p>
      </div>
    </>
  );
};

export default ProjectInfo;
