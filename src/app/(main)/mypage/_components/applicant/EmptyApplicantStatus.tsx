import Link from 'next/link';

const EmptyApplicantStatus = () => {
  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="tablet:title-2 title-4 text-gray-900">지원자 현황</p>
        <Link
          href="/mypage/applicant"
          className="tablet:block body-6 hidden self-end text-gray-700"
        >
          전체보기
        </Link>
      </div>
      <div className="tablet:body-3 body-7 flex h-[187px] w-full max-w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
        <span>
          <Link href="/recruit" className="text-gray-700 underline">
            팀원 모집하기
          </Link>{' '}
          페이지로 이동해서
          <br />
          함께할 프로젝트 팀원을 모집해보세요!
        </span>
      </div>
    </>
  );
};

export default EmptyApplicantStatus;
