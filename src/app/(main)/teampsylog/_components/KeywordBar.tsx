import { useGetKeyword } from '@/hooks/queries/useKeyword';
import React from 'react';
import KeywordItem from './KeywordItem';
import Button from '@/components/common/button/Button';
import Image from 'next/image';

const DEFAULT_KEYWORDS = ['대표키워드1', '대표키워드2', '대표키워드3'];

const KeywordBar = ({ profileId }: { profileId: number }) => {
  const { data } = useGetKeyword({ profileId });

  const keywords =
    data?.headKeywords && data.headKeywords.length > 0 ? data.headKeywords : DEFAULT_KEYWORDS;

  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
      <div className="flex gap-2">
        {keywords.map((keyword, index) => (
          <KeywordItem key={`${keyword}-${index}`} keyword={keyword} />
        ))}
      </div>
      <div className="flex gap-2">
        <Button className="text-primary-900 border-primary-900 bg-gray-0 body-5 flex items-center gap-[5px] border px-5 py-3">
          <Image src="/icons/edit.svg" alt="수정하기" width={24} height={24} />
          <p>수정하기</p>
        </Button>
        <Button className="text-gray-0 bg-primary-900 body-5 flex items-center gap-[5px] px-5 py-3">
          <Image src="/icons/share.svg" alt="공유하기" width={24} height={24} />
          <p>공유하기</p>
        </Button>
      </div>
    </div>
  );
};

export default KeywordBar;
