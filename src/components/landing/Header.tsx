'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LandingContainer } from './LandingContainer';
import { useUserStore } from '@/store/useUserStore';
import { isLoggedIn as checkIsLoggedIn } from '@/utils/auth';

export function Header() {
  const { userName, _hasHydrated } = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!_hasHydrated) return;
    setIsLoggedIn(checkIsLoggedIn(userName));
  }, [_hasHydrated, userName]);

  const handleLoginClick = () => {
    localStorage.setItem('redirectAfterLogin', '/teampsylog');
  };

  return (
    <LandingContainer className="sticky top-0 z-50 h-15">
      <div className="flex h-15 items-center justify-between px-10">
        <Link href="/" className="cursor-pointer">
          <Image src="/images/logo-black.svg" alt="teamficial" width={100} height={13} />
        </Link>
        {!isLoggedIn ? (
          <Link href="/login" className="body-7 cursor-pointer" onClick={handleLoginClick}>
            로그인
          </Link>
        ) : (
          <div />
        )}
      </div>
    </LandingContainer>
  );
}
