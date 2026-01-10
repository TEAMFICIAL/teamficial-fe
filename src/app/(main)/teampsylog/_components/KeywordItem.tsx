import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

interface KeywordItemProps {
  keyword: string;
  isEditMode?: boolean;
  isSelected?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
  isMobileDevice?: boolean;
}

const getTextLengthWithoutSpaces = (text: string) => text.replace(/\s/g, '').length;

const KeywordItem = ({
  keyword,
  isEditMode = false,
  isSelected = false,
  isPlaceholder = false,
  onClick,
  isMobileDevice = false,
}: KeywordItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const limit = isMobileDevice ? 5 : 9999;
  const textLength = getTextLengthWithoutSpaces(keyword);
  const isTruncated = textLength > limit;
  let displayText = keyword;
  if (isMobileDevice && isTruncated) {
    // 띄어쓰기 제외 5글자 제한
    let count = 0;
    displayText = '';
    for (let i = 0; i < keyword.length; i++) {
      if (keyword[i] !== ' ') count++;
      if (count > limit) {
        displayText += '...';
        break;
      }
      displayText += keyword[i];
    }
  }

  const handleMouseEnter = () => {
    if (!isEditMode && isTruncated) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isEditMode && isTruncated) {
      setShowTooltip(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  const handleTouch = () => {
    if (!isEditMode && isMobileDevice && isTruncated) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowTooltip(true);
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
        timeoutRef.current = null;
      }, 1500);
    }
  };

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
        onTouchStart={handleTouch}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
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
