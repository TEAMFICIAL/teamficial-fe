'use client';

import { useState, useEffect } from 'react';
import LoginSocial from './LoginSocial';
import { getCookie } from '@/utils/cookie';

type SocialType = 'kakao' | 'naver' | 'google';

function handleKakaoLogin() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  window.location.replace(kakaoUrl);
}
function handleGoogleLogin() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  const REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`;
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  window.location.replace(googleUrl);
}
function handleNaverLogin() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  const REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_STATE = process.env.NEXT_PUBLIC_NAVER_STATE;
  const NAVER_REDIRECT_URI = `${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
  window.location.replace(naverUrl);
}

export const socialConfig = {
  naver: {
    name: '네이버',
    imageSrc: '/icons/naver.svg',
    bgColor: 'bg-[#05CB5B]',
    textColor: 'text-gray-0',
    onClick: handleNaverLogin,
  },
  kakao: {
    name: '카카오',
    imageSrc: '/icons/kakao.svg',
    bgColor: 'bg-[#FEE500]',
    textColor: 'text-gray-800',
    onClick: handleKakaoLogin,
  },
  google: {
    name: '구글',
    imageSrc: '/icons/google.svg',
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-800',
    onClick: handleGoogleLogin,
  },
};

export default function LoginSocialList() {
  const [lastLoginProvider, setLastLoginProvider] = useState<SocialType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastProvider = getCookie('lastLoginProvider') as SocialType | null;
      if (lastProvider && ['naver', 'kakao', 'google'].includes(lastProvider)) {
        setLastLoginProvider(lastProvider);
      }
    }
  }, []);

  // 고정된 순서: 네이버, 카카오, 구글
  const fixedOrder: SocialType[] = ['naver', 'kakao', 'google'];

  return (
    <div className="tablet:gap-4 mt-6 flex w-full flex-col items-center gap-2">
      {fixedOrder.map((type) => (
        <LoginSocial
          key={type}
          type={type}
          onClick={socialConfig[type].onClick}
          isRecentLogin={type === lastLoginProvider}
        />
      ))}
    </div>
  );
}
