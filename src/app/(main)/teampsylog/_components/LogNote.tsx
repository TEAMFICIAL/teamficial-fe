import { useGetKeywordList } from '@/hooks/queries/useKeyword';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const LogNote = () => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const userData = JSON.parse(userString);
      const userId = userData?.state?.userId;
      if (userId) setCurrentUserId(userId);
    } catch {
      setCurrentUserId(null);
    }
  }, []);

  const { data } = useGetKeywordList({
    userId: currentUserId ?? 0,
    page,
    size: 6,
  });

  // 키워드 목록
  const keywords = data?.content?.map((item) => item.keywordName) || [];
  const totalPages = Math.ceil((data?.totalElements || 1) / 6);

  return (
    <section className="relative flex">
      {/* 왼쪽 페이지 */}
      <div className="relative flex h-162 w-118 flex-col items-center justify-center gap-[13px] rounded-l-[16px] bg-gray-100 shadow-[0_4px_7.1px_0_#E1E1E1]">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="absolute top-1/2 left-[-16px] flex -translate-y-1/2 cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/page-before.svg" alt="이전 페이지" width={32} height={32} />
        </button>
        {data?.totalElements === 0 ? (
          <>
            <Image
              src="/icons/gray_teamficial_symbol.svg"
              alt="teamficial_symbol"
              width={66}
              height={67}
            />
            <p className="body-3 text-center whitespace-pre-line text-gray-500">
              {`나의 팀피셜록 링크를 공유하고\n키워드를 받아보세요`}
            </p>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col items-center gap-2">
              {keywords.map((keyword: string, idx: number) => (
                <div key={idx} className="body-3 w-full py-1 text-center text-gray-700">
                  {keyword}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* 오른쪽 페이지 */}
      <div className="relative flex h-162 w-118 flex-col items-center justify-center gap-[13px] rounded-r-[16px] bg-gray-200 shadow-[0_4px_4px_0_#E1E1E1]">
        <button
          onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
          disabled={page + 1 >= totalPages}
          className="absolute top-1/2 right-[-16px] flex -translate-y-1/2 cursor-pointer items-center justify-center disabled:opacity-50"
        >
          <Image src="/icons/page-after.svg" alt="다음 페이지" width={32} height={32} />
        </button>
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
  );
};

export default LogNote;
