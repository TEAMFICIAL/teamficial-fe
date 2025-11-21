'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/libs/api/api';
import { useUserStore } from '@/store/useUserStore';

export default function KakaoCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const code = params.get('code');

    if (code) {
      api
        .post('/auth/kakao', null, {
          params: {
            accessCode: code,
            redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          },
        })
        .then((res) => {
          const result = res.data?.result;
          if (!result) {
            router.replace('/login');
            return;
          }

          const { userId, accessToken, refreshToken, first, uuid, userName } = result;

          if (res.data.code === '200') {
            setUser({ uuid, userId, userName });

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (first) {
              router.replace('/');
            } else {
              router.replace('/');
            }
          } else {
            router.replace('/login');
          }
        })
        .catch((err) => {
          console.log(err);
          router.replace('/login');
        });
    }
  }, [params, router, setUser]);

  return null;
}
