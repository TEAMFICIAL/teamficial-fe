'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const KeywordGuideOverlay = ({ onClose }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    const newValue = !checked;
    setChecked(newValue);

    if (newValue) {
      localStorage.setItem('hideKeywordGuide', 'true');
      onClose();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex justify-center bg-black/70">
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

        <div
          className="pointer-events-auto absolute right-[55px] bottom-[80px] flex cursor-pointer items-center gap-2"
          onClick={handleClick}
        >
          <div
            className={`h-4 w-4 border border-white transition-colors ${
              checked ? 'bg-white' : 'bg-transparent'
            }`}
          />

          <span className="body-5 text-gray-0">다시보지않기</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordGuideOverlay;
