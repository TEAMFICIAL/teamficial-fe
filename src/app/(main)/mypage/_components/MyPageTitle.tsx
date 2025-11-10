import Link from 'next/link';

const MyPageTitle = () => {
  return (
    <div className="flex w-full justify-between pt-7 pb-5">
      <div className="flex flex-col">
        <p className="title-2 text-gray-900">마이페이지</p>
        <p className="body-4 text-gray-700">
          대표 키워드 수정은{' '}
          <Link href="/" className="underline">
            팀피셜록
          </Link>{' '}
          페이지에서 가능합니다
        </p>
      </div>
      <Link href="/mypage/profile" className="body-6 self-end text-gray-700">
        프로필 관리하기
      </Link>
    </div>
  );
};

export default MyPageTitle;
