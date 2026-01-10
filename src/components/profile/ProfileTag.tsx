import React from 'react';

type TagProps = {
  children: string;
  maxLength?: number;
};

import { useState, useRef } from 'react';

const ProfileTag = ({ children, maxLength }: TagProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const limit = typeof maxLength === 'number' ? maxLength : 5;
  const getTextLengthWithoutSpaces = (text: string) => text.replace(/\s/g, '').length;
  const isTruncated = getTextLengthWithoutSpaces(children) > limit;
  let displayText = children;
  if (isTruncated) {
    let count = 0;
    displayText = '';
    for (let i = 0; i < children.length; i++) {
      if (children[i] !== ' ') count++;
      if (count > limit) {
        displayText += '...';
        break;
      }
      displayText += children[i];
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isTruncated) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setTooltipPos({ left: rect.left + window.scrollX, top: rect.bottom + window.scrollY });
      setShowTooltip(true);
    }
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipPos(null);
  };

  return (
    <>
      <span
        ref={tagRef}
        className="body-9 bg-gray-0 desktop:px-4 desktop:py-2 relative cursor-default rounded-lg border border-gray-300 px-2 py-1 text-gray-600"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        #{displayText}
      </span>
      {showTooltip && tooltipPos && tagRef.current && (
        <span
          style={{
            position: 'absolute',
            left: tooltipPos.left + tagRef.current.offsetWidth / 2,
            top: tooltipPos.top + 4,
            transform: 'translateX(-50%)',
            background: 'rgba(60,60,60,0.95)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
          }}
        >
          #{children}
        </span>
      )}
    </>
  );
};

export default ProfileTag;
