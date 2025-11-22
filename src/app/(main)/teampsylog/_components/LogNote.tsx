'use client';

import { useGetKeywordList } from '@/hooks/queries/useKeyword';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CommentPage from './CommentPage';
import AllKeyword from './AllKeyword';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';

const LogNote = ({
  userId,
  isEditMode = false,
  selectedSlot = null,
  onSelectKeyword,
}: {
  userId?: number;
  isEditMode?: boolean;
  selectedSlot?: number | null;
  onSelectKeyword?: (keywordId: number) => void;
}) => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useGetKeywordList({
    userId: userId ?? 0,
    page,
    size: 5,
  });

  // 키워드 목록
  const keywords = data?.content?.map((item) => item.keywordName) || [];
  const keywordIds = data?.content?.map((item) => item.keywordId) || [];
  const totalPages = Math.ceil((data?.totalElements || 1) / 5);

  const [selectedKeywordId, setSelectedKeywordId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedKeywordId(null);
  }, [page]);

  const handleKeywordClick = (keywordId: number) => {
    if (isEditMode && selectedSlot !== null) {
      // 편집 모드: 선택된 슬롯에 키워드 할당
      onSelectKeyword?.(keywordId);
    } else if (!isEditMode) {
      // 일반 모드: 댓글 보기
      setSelectedKeywordId(keywordId);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorDisplay message="데이터를 불러오는 중 오류가 발생했습니다." />
      ) : (
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
              <AllKeyword
                keywords={keywords}
                keywordIds={keywordIds}
                isEditMode={isEditMode}
                selectedSlot={selectedSlot}
                onSelectKeyword={onSelectKeyword}
                onKeywordClick={handleKeywordClick}
              />
            )}
          </div>
          {/* 오른쪽 페이지 */}
          <div
            className={`relative flex h-162 w-118 flex-col gap-[13px] rounded-r-[16px] bg-gray-200 shadow-[0_4px_4px_0_#E1E1E1] ${
              !selectedKeywordId || isEditMode ? 'items-center justify-center' : ''
            }`}
          >
            <button
              onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
              disabled={page + 1 >= totalPages}
              className="absolute top-1/2 right-[-16px] flex -translate-y-1/2 cursor-pointer items-center justify-center disabled:opacity-50"
            >
              <Image src="/icons/page-after.svg" alt="다음 페이지" width={32} height={32} />
            </button>
            {data?.totalElements === 0 ? null : isEditMode ? (
              <>
                <Image
                  src="/icons/gray_teamficial_symbol.svg"
                  alt="teamficial_symbol"
                  width={66}
                  height={67}
                />
                <p className="body-3 text-center whitespace-pre-line text-gray-500">
                  {selectedSlot !== null
                    ? `변경할 키워드를 선택하세요`
                    : '변경할 대표키워드를\n먼저 선택하세요'}
                </p>
              </>
            ) : !selectedKeywordId ? (
              <>
                <Image
                  src="/icons/gray_teamficial_symbol.svg"
                  alt="teamficial_symbol"
                  width={66}
                  height={67}
                />
                <p className="body-3 text-center whitespace-pre-line text-gray-500">
                  키워드를 선택해 자세한 내용을 확인하세요
                </p>
              </>
            ) : (
              <CommentPage
                keywordName={keywords[keywordIds.findIndex((id) => id === selectedKeywordId)] ?? ''}
                keywordId={selectedKeywordId}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default LogNote;
