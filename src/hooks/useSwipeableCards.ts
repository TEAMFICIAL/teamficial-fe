'use client';

import { useState, useRef, useEffect } from 'react';

interface UseSwipeableCardsProps<T> {
  items: T[];
  maxItems?: number;
  minSwipeDistance?: number;
}

export const useSwipeableCards = <T>({
  items,
  maxItems = 3,
  minSwipeDistance = 50,
}: UseSwipeableCardsProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const displayItems = items.slice(0, maxItems);

  useEffect(() => {
    const maxIndex = Math.max(displayItems.length - 1, 0);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [displayItems.length, currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < displayItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    currentIndex,
    setCurrentIndex,
    displayItems,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
