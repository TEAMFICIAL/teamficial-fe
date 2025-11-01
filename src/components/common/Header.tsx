import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-[1024px] justify-between px-10 pt-5">
      {/* TODO: 각 이동 링크로 변경 */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 pr-5">
          <Image src="/icons/teamficial-symbol.svg" alt="logo" width={40} height={40} />
          <Image
            src="/icons/teamficial-logo.svg"
            alt="logo"
            width={94.688}
            height={31.574}
            className="h-[31.6px]"
          />
        </Link>
        <Link href="/project" className="body-4 px-3">
          프로젝트
        </Link>
        <Link href="/" className="body-4 px-3">
          팀피셜록
        </Link>
      </div>
      {/* TODO: 추후 로그인 상태 적용하여 변경 */}
      <Link href="/login" className="flex items-center gap-4">
        <span className="body-6">로그인/회원가입</span>
        <Image src="/icons/profile.svg" alt="profile" width={44} height={44} />
      </Link>
    </header>
  );
};

export default Header;
