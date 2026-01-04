'use client';

import Button from '@/components/common/button/Button';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

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

  // Swiper instance and active index for mobile dot indicator
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center bg-black/70">
      {/* desktop */}
      <div className="desktop:block relative mx-auto hidden w-[1024px]">
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
      {/* mobile */}
      <div className="desktop:hidden relative mx-auto flex min-h-screen w-full flex-col">
        <div className="mt-[25px] flex justify-center">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            className="w-full px-8"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            <SwiperSlide>
              <Image
                src="/icons/tutorial-1.svg"
                alt="tutorial-1"
                width={238}
                height={369}
                className="mx-auto"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/icons/tutorial-2.svg"
                alt="tutorial-2"
                width={260}
                height={169}
                className="mx-auto"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col pb-6">
          <div className="mb-4 flex justify-center">
            {[0, 1].map((idx) => (
              <span
                key={idx}
                className={`mx-1 h-2 w-2 rounded-full ${
                  activeIndex === idx ? 'bg-primary-900' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
          <Button onClick={onClose} className="bg-primary-900 body-5 text-gray-0 mx-4 mb-2 py-4">
            마치기
          </Button>
          <label className="pointer-events-auto mt-4 flex cursor-pointer items-center justify-center gap-2">
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
            <span className="body-9 text-gray-0">다시보지않기</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default KeywordGuideOverlay;
