import Link from 'next/link';

const MyPageTitle = () => {
  return (
    <div className="tablet:pt-7 tablet:pb-5 flex w-full justify-between pt-3 pb-4">
      <div className="flex flex-col">
        <p className="tablet:title-2 title-4 text-gray-900">마이페이지</p>
        <p className="tablet:body-4 body-10 text-gray-700">
          대표 키워드 수정은{' '}
          <Link href="/teampsylog" className="underline">
            팀피셜록
          </Link>{' '}
          페이지에서 가능합니다
        </p>
      </div>
      <Link href="/mypage/profile" className="tablet:block body-6 hidden self-end text-gray-700">
        프로필 관리하기
      </Link>
    </div>
  );
};

export default MyPageTitle;
