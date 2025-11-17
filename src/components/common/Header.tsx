'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {
  const { userName } = useUserStore();
  const isLoggedIn = !!userName;
  const pathname = usePathname();

  return (
    <>
      {/* PC */}
      <header className="tablet:flex mx-auto hidden w-full max-w-[1024px] justify-between px-10 pt-5">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 pr-4">
            <Image
              src="/icons/teamficial-header.svg"
              alt="teamficial-logo"
              width={143}
              height={41}
            />
          </Link>
          <Link
            href="/project"
            className={clsx(
              'body-4 hover:text-primary-900 px-3 transition-colors',
              pathname.startsWith('/project') ? 'text-primary-900' : 'text-gray-900',
            )}
          >
            프로젝트
          </Link>
          <Link
            href="/teampsylog"
            className={clsx(
              'body-4 hover:text-primary-900 px-3 transition-colors',
              pathname.startsWith('/teampsylog') ? 'text-primary-900' : 'text-gray-900',
            )}
          >
            팀피셜록
          </Link>
        </div>
        {isLoggedIn ? (
          <Link href="/mypage" className="flex items-center gap-3">
            <span className="body-6 font-semibold">{userName}님</span>
            <Image src="/icons/profile.svg" alt="profile" width={44} height={44} />
          </Link>
        ) : (
          <Link href="/login" className="flex items-center gap-3">
            <span className="body-6">로그인/회원가입</span>
            <Image src="/icons/profile.svg" alt="profile" width={44} height={44} />
          </Link>
        )}
      </header>
      {/* mobile */}
      <header className="tablet:hidden mx-auto flex w-full max-w-[1024px] justify-between px-4 py-5">
        <Link href="/" className="flex items-center gap-2 pr-4">
          <Image src="/icons/teamficial-header.svg" alt="teamficial-logo" width={100} height={29} />
        </Link>
        <button>
          <Image src="/icons/menu.svg" alt="menu" width={28} height={28} />
        </button>
      </header>
    </>
  );
};

export default Header;
