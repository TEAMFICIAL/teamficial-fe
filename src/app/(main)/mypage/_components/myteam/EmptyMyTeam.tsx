import Link from 'next/link';

const EmptyMyTeam = () => {
  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="tablet:title-2 title-4 text-gray-900">참여중인 팀</p>
        <Link href="/" className="tablet:block body-6 hidden self-end text-gray-700">
          전체보기
        </Link>
      </div>
      <div className="tablet:title-4 body-8 flex h-[187px] w-full max-w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          누가 함께하게 될까요?
          <br />
          프로젝트에 지원해 팀에 들어가보세요!
        </span>
      </div>
    </>
  );
};

export default EmptyMyTeam;
