'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {
  const { userName } = useUserStore();
  const isLoggedIn = !!userName;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    useUserStore.getState().clearUser();
  };

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
              'hover:text-primary-900 px-3 transition-colors',
              pathname.startsWith('/project') ? 'text-primary-900 body-3' : 'body-4 text-gray-900',
            )}
          >
            프로젝트
          </Link>
          <Link
            href="/teampsylog"
            className={clsx(
              'hover:text-primary-900 px-3 transition-colors',
              pathname.startsWith('/teampsylog')
                ? 'text-primary-900 body-3'
                : 'body-4 text-gray-900',
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
        <button onClick={() => setIsMenuOpen(true)}>
          <Image src="/icons/menu.svg" alt="menu" width={28} height={28} />
        </button>
      </header>
      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsMenuOpen(false)} />
          {/* 메뉴 패널*/}
          <div className="absolute top-0 right-0 flex h-full w-70 flex-col bg-white px-4">
            <button
              className="my-5 self-end"
              onClick={() => setIsMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <Image src="/icons/close.svg" alt="close" width={28} height={28} />
            </button>
            <div className="flex justify-between py-4">
              <div className="flex flex-col items-start gap-1">
                <p className="title-4 text-gray-800">
                  {isLoggedIn ? `${userName}님` : '로그인이 필요합니다'}
                </p>
                {isLoggedIn ? (
                  <button className="body-8 text-gray-700" onClick={handleLogout}>
                    로그아웃
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="body-8 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인/회원가입
                  </Link>
                )}
              </div>
              <Link href={isLoggedIn ? '/mypage' : '/login'}>
                <Image src="/icons/profile.svg" alt="profile" width={42} height={42} />
              </Link>
            </div>
            <div className="mt-4 h-[1px] w-full bg-gray-300" />
            <div className="body-5 flex flex-col gap-4 pt-5">
              <Link
                href="/project"
                className={clsx(
                  pathname.startsWith('/project') ? 'text-primary-900' : 'text-gray-800',
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                프로젝트
              </Link>
              <Link
                href="/teampsylog"
                className={clsx(
                  pathname.startsWith('/teampsylog') ? 'text-primary-900' : 'text-gray-800',
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                팀피셜록
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/mypage"
                  className={clsx(
                    pathname.startsWith('/mypage') ? 'text-primary-900' : 'text-gray-800',
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  마이페이지
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
