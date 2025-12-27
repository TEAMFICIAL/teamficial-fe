import Link from 'next/link';

const EmptyMyTeam = () => {
  return (
    <>
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">나의 팀</p>
        <Link href="/" className="body-6 self-end text-gray-700">
          전체보기
        </Link>
      </div>
      <div className="title-4 flex h-[187px] w-full max-w-[944px] items-center justify-center rounded-2xl bg-gray-200 p-2.5 text-center text-gray-600">
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
