'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/api/api';

export default function NaverCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');

    if (code) {
      api
        .post('/auth/naver', null, {
          params: {
            code: code,
            state: state,
            redirectUri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI,
          },
        })
        .then((res) => {
          const { userId, accessToken, refreshToken, first } = res.data.result;
          localStorage.setItem('userId', userId);

          if (res.data.code === '200') {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (first) {
              router.replace('/signup');
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
  }, [params, router]);

  return null;
}
