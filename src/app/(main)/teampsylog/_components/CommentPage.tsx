'use client';

import React, { useEffect } from 'react';
import { useInfiniteKeywordComment } from '@/hooks/queries/useKeyword';
import { useInView } from 'react-intersection-observer';
import { formatDateDot } from '@/utils/project/formatDate';

const CommentPage = ({ keywordId, keywordName }: { keywordId: number; keywordName: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteKeywordComment({
    keywordId,
    size: 4,
  });

  const comments = data?.pages.flatMap((page) => page.data) || [];

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-7 p-8" style={{ overflowY: 'auto' }}>
      <div className="flex flex-col">
        <p className="title-4">{`‘${keywordName}’에 대한 다른 사람들의 코멘트에요`}</p>
        <p className="body-6 text-gray-600">중복된 키워드는 말풍선이 커져요</p>
      </div>
      <div className="flex flex-col gap-3">
        {comments.map((comment, idx) => (
          <div key={idx} className="flex flex-col gap-2 rounded-[12px] bg-white px-5 pt-4 pb-5">
            <div>
              <p className="body-8 text-gray-500">{formatDateDot(comment.createdAt)}</p>
              <div className="h-[1px] w-full bg-gray-300" />
            </div>
            <div className="body-6 text-gray-800">{comment.comment}</div>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className="py-2 text-center text-gray-400">
          {isFetchingNextPage ? '불러오는 중...' : '아래로 스크롤하여 더 보기'}
        </div>
      )}
    </div>
  );
};

export default CommentPage;
