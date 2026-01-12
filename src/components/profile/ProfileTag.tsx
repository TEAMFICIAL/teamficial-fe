import { useIsMobile } from '@/hooks/useIsMobile';
import { useTruncatedTooltip } from '@/hooks/useTruncatedTooltip';
import React from 'react';

type TagProps = {
  children: string;
  maxLength?: number;
};

const ProfileTag = ({ children, maxLength }: TagProps) => {
  const isMobile = useIsMobile();
  const {
    ref: tagRef,
    showTooltip,
    displayText,
    handleMouseEnter,
    handleMouseLeave,
    handleTouch,
  } = useTruncatedTooltip({ text: children, maxLength, isMobile });

  return (
    <span className="relative inline-block">
      <span
        ref={tagRef as React.RefObject<HTMLSpanElement>}
        className="body-9 bg-gray-0 desktop:px-4 desktop:py-2 relative cursor-default rounded-lg border border-gray-300 px-2 py-1 text-gray-600"
        onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLSpanElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLSpanElement>}
        onTouchStart={handleTouch as React.TouchEventHandler<HTMLSpanElement>}
      >
        #{displayText}
      </span>
      {showTooltip && (
        <span className="absolute top-full left-1/2 z-50 mt-1 -translate-x-1/2 rounded-lg bg-gray-800/95 px-4 py-2 text-sm whitespace-nowrap text-white shadow-lg">
          #{children}
        </span>
      )}
    </span>
  );
};

export default ProfileTag;
