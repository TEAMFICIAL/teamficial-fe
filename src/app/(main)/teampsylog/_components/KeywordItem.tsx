import React from 'react';
import { useTruncatedTooltip } from '@/hooks/useTruncatedTooltip';

interface KeywordItemProps {
  keyword: string;
  isEditMode?: boolean;
  isSelected?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
  isMobileDevice?: boolean;
}

const KeywordItem = ({
  keyword,
  isEditMode = false,
  isSelected = false,
  isPlaceholder = false,
  onClick,
  isMobileDevice = false,
}: KeywordItemProps) => {
  // limit: 모바일 5, 데스크탑 9999 (사실상 무제한)
  const maxLength = isMobileDevice ? 5 : 9999;

  const {
    ref: spanRef,
    showTooltip,
    displayText,
    isTruncated,
    handleMouseEnter,
    handleMouseLeave,
    handleTouch,
  } = useTruncatedTooltip({ text: keyword, maxLength, isMobile: isMobileDevice });

  const handleFocus = (e: React.FocusEvent<HTMLSpanElement>) =>
    handleMouseEnter(e as unknown as React.MouseEvent<HTMLSpanElement>);
  const handleBlur = () => handleMouseLeave();

  return (
    <div
      onClick={onClick}
      className={`desktop:body-5 body-9 desktop:px-5 desktop:py-3 box-border rounded-lg px-3 py-2 transition-all ${
        isEditMode && isSelected && isPlaceholder
          ? 'border-primary-900 bg-primary-50 text-primary-900 cursor-pointer border-2 border-dashed'
          : isEditMode && isSelected
            ? 'border-primary-900 bg-primary-50 text-primary-900 cursor-pointer border'
            : isEditMode && isPlaceholder
              ? 'cursor-pointer border-2 border-dashed border-gray-400 bg-gray-50 text-gray-600'
              : isEditMode
                ? 'cursor-pointer border border-gray-300 bg-gray-50 text-gray-800'
                : `border border-gray-300 bg-gray-50 ${isPlaceholder ? 'text-gray-600' : 'text-gray-800'}`
      } `}
    >
      <span
        ref={spanRef as React.RefObject<HTMLSpanElement>}
        onTouchStart={handleTouch as React.TouchEventHandler<HTMLSpanElement>}
        onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLSpanElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLSpanElement>}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={!isEditMode && isTruncated ? 0 : undefined}
        className="relative cursor-pointer"
        aria-label={isTruncated ? keyword : undefined}
      >
        #{displayText}
        {showTooltip && (
          <span
            role="tooltip"
            className="absolute top-full left-1/2 z-20 mt-1 -translate-x-1/2 rounded bg-black/70 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg"
          >
            #{keyword}
          </span>
        )}
      </span>
    </div>
  );
};

export default KeywordItem;
