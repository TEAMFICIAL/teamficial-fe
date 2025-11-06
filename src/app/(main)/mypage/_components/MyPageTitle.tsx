const MyPageTitle = () => {
  return (
    <div className="flex w-full justify-between pt-7 pb-5">
      <div className="flex flex-col">
        <p className="title-2 text-gray-900">마이페이지</p>
        <p className="body-4 text-gray-700">
          대표 키워드 수정은 <span className="cursor-pointer underline">팀피셜록</span> 페이지에서
          가능합니다
        </p>
      </div>
      <p className="body-6 cursor-pointer self-end text-gray-700">프로필 관리하기</p>
    </div>
  );
};

export default MyPageTitle;
