import Link from 'next/link';
import React from 'react';

const ProfileTitle = () => {
  return (
    <div className="tablet:flex hidden flex-col pt-7 pb-5">
      <p className="title-2 text-gray-900">프로필 관리하기</p>
      <p className="body-4 text-gray-700">
        대표 키워드 수정은{' '}
        <Link href="/teampsylog" className="underline">
          팀피셜록
        </Link>{' '}
        페이지에서 가능합니다
      </p>
    </div>
  );
};

export default ProfileTitle;
