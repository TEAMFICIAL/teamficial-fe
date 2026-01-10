import Link from 'next/link';

const EmptyAppliedTeam = () => {
  return (
    <>
      <div className="tablet:py-5 flex w-full justify-between pt-5 pb-3">
        <p className="tablet:title-2 title-4 text-gray-900">내가 지원한 팀</p>
        <Link href="/mypage/applied" className="tablet:block body-6 hidden self-end text-gray-700">
          전체보기
        </Link>
      </div>
      <div className="body-3 tablet:flex hidden h-[164px] h-[220px] w-full max-w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          <Link href="/project" className="text-gray-700 underline">
            프로젝트
          </Link>{' '}
          페이지로 이동해서
          <br />
          내가 가진 소프트 스킬로 팀에 지원해보세요!
        </span>
      </div>
      <div className="tablet:hidden body-8 mb-7 flex h-[164px] w-full max-w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          <Link href="/project" className="text-gray-700 underline">
            프로젝트
          </Link>{' '}
          페이지로 이동해서
          <br />
          내가 가진 소프트 스킬로 <br />
          팀에 지원해보세요!
        </span>
      </div>
    </>
  );
};

export default EmptyAppliedTeam;
