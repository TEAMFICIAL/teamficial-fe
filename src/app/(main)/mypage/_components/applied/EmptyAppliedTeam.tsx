const EmptyAppliedTeam = () => {
  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">내가 지원한 팀</p>
        <p className="body-6 cursor-pointer self-end text-gray-700">전체보기</p>
      </div>
      <div className="flex h-[220px] w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          <span className="cursor-pointer text-gray-700 underline">프로젝트</span> 페이지로 이동해서
          <br />
          내가 가진 소프트 스킬로 팀에 지원해보세요!
        </span>
      </div>
    </>
  );
};

export default EmptyAppliedTeam;
