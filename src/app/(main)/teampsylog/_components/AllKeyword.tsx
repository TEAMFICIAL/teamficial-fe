import React from 'react';
import Image from 'next/image';

interface AllKeywordProps {
  keywords: string[];
  keywordIds: number[];
  isEditMode: boolean;
  selectedSlot: number | null;
  onSelectKeyword?: (keywordId: number) => void;
  onKeywordClick: (keywordId: number) => void;
}

// 키워드 아이콘 위치/회전 정보 상수
const KEYWORD_ICON_STYLES = [
  { top: 49.8, left: 224, rotate: '14.781deg' },
  { top: 166.8, left: 43, rotate: '0deg' },
  { top: 277.5, left: 227, rotate: '6.665deg' },
  { top: 381, left: 34, rotate: '14.074deg' },
  { top: 540, left: 226, rotate: '-3.128deg' },
];

const AllKeyword = ({
  keywords,
  keywordIds,
  isEditMode,
  selectedSlot,
  onSelectKeyword,
  onKeywordClick,
}: AllKeywordProps) => {
  const handleClick = (keywordId: number) => {
    if (isEditMode && selectedSlot !== null) {
      onSelectKeyword?.(keywordId);
    } else if (!isEditMode) {
      onKeywordClick(keywordId);
    }
  };

  return (
    <div className="relative flex w-full" style={{ minHeight: 650 }}>
      {/* 배경 따옴표 아이콘 */}
      <Image
        src="/icons/question-border.svg"
        alt=""
        width={79}
        height={68}
        className="absolute"
        style={{
          top: 262,
          left: 75,
          transform: 'rotate(7.509deg)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <Image
        src="/icons/question-border.svg"
        alt=""
        width={79}
        height={68}
        className="absolute"
        style={{
          top: 418,
          right: 78,
          transform: 'rotate(149.933deg)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* 키워드 아이콘 5개 */}
      {keywords.slice(0, 5).map((keyword: string, idx: number) => {
        const keywordId = keywordIds[idx];
        const style = KEYWORD_ICON_STYLES[idx] || {};
        return (
          <Image
            key={idx}
            src={`/images/keywords/${keyword}.svg`}
            alt={keyword}
            width={240}
            height={65}
            className="absolute z-10 block cursor-pointer object-contain"
            style={{
              top: style.top,
              left: style.left,
              height: 65,
              transform: `rotate(${style.rotate})`,
              transformOrigin: 'center center',
            }}
            onClick={() => handleClick(keywordId)}
          />
        );
      })}
    </div>
  );
};

export default AllKeyword;
