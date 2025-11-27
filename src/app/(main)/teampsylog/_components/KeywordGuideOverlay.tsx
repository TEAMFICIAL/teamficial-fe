'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

const KeywordGuideOverlay = ({ onClose }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    const newValue = !checked;
    setChecked(newValue);

    if (newValue) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('hideKeywordGuide', 'true');
        }
      } catch (error) {
        console.error('Failed to save guide preference:', error);
      }
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center bg-black/70">
      <div className="relative mx-auto w-[1024px]">
        <div className="mt-[25px] flex justify-center">
          <Image
            src="/icons/tutorial.svg"
            alt="tutorial"
            width={952}
            height={411}
            className="ml-[50px]"
          />
        </div>

        <label className="pointer-events-auto absolute right-[55px] bottom-[80px] flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleClick}
            className="sr-only"
            aria-label="튜토리얼 다시 보지 않기"
          />
          <div
            className={`h-4 w-4 border border-white transition-colors ${
              checked ? 'bg-white' : 'bg-transparent'
            }`}
            aria-hidden="true"
          />
          <span className="body-5 text-gray-0">다시보지않기</span>
        </label>
      </div>
    </div>
  );
};

export default KeywordGuideOverlay;
