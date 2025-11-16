import { useGetKeywordList } from '@/hooks/queries/useKeyword';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const LogNote = () => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.log('No user in localStorage');
        return;
      }

      const userData = JSON.parse(userString);
      const userId = userData?.state?.userId;

      if (userId) {
        setCurrentUserId(userId);
      }
    } catch (error) {
      console.error('localStorage 파싱 에러:', error);
      setCurrentUserId(null);
    }
  }, []);

  const { data } = useGetKeywordList({
    userId: currentUserId ?? 0,
    page: 0,
    size: 3,
  });

  return (
    <>
      <section className="flex">
        <div className="flex h-162 w-118 flex-col items-center justify-center gap-[13px] rounded-l-[16px] bg-gray-100 shadow-[0_4px_7.1px_0_#E1E1E1]">
          <Image
            src="/icons/gray_teamficial_symbol.svg"
            alt="teamficial_symbol"
            width={66}
            height={67}
          />
          <p className="body-3 text-center whitespace-pre-line text-gray-500">
            {`나의 팀피셜록 링크를 공유하고\n키워드를 받아보세요`}
          </p>
        </div>
        <div className="flex h-162 w-118 flex-col items-center justify-center gap-[13px] rounded-r-[16px] bg-gray-200 shadow-[0_4px_4px_0_#E1E1E1]">
          <Image
            src="/icons/gray_teamficial_symbol.svg"
            alt="teamficial_symbol"
            width={66}
            height={67}
          />
          <p className="body-3 text-center whitespace-pre-line text-gray-500">
            키워드를 선택해 자세한 내용을 확인하세요
          </p>
        </div>
      </section>
    </>
  );
};

export default LogNote;
