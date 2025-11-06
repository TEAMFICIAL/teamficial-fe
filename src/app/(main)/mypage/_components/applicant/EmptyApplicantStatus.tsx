const EmptyApplicantStatus = () => {
  return (
    <div className="mb-14">
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">지원자 현황</p>
        <p className="body-6 cursor-pointer self-end text-gray-700">전체보기</p>
      </div>
      <div className="flex h-[187px] w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          <span className="cursor-pointer text-gray-700 underline">팀원 모집하기</span> 페이지로
          이동해서
          <br />
          함께할 프로젝트 팀원을 모집해보세요!
        </span>
      </div>
    </div>
  );
};

export default EmptyApplicantStatus;
