import React from 'react';
const TextContent = () => {
  return (
    <div className="flex flex-col gap-9 rounded-2xl border-1 border-gray-300 px-8 py-4">
      <div className="flex w-full gap-6 border-b-1 border-gray-300 ps-5 pt-2.5 pb-5">
        24px 툴바 아이콘 나열
      </div>
      <div className="body-6 text-gray-500">
        *최소 50자 이상부터 작성 가능해요 <br /> 팀원에게 첫인상이 되는 모집글은 꼼꼼히 작성할수록
        좋아요 <br /> <br /> {'<작성 예시>'} <br /> - 어떤 프로젝트인지 소개해주세요 <br /> -
        누구와, 왜, 어떤 목표로 함께하고 싶은지 작성해주세요 <br />- 어떤 성향의 사람들을 찾고
        있는지 작성해주세요
      </div>
    </div>
  );
};
export default TextContent;
