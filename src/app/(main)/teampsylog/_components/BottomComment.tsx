'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomComment = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const currentY = e.clientY;
      const diff = currentY - dragStartY;

      if (diff > 0) {
        setDragCurrentY(diff);
      }
    },
    [isDragging, dragStartY],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    if (dragCurrentY > 150) {
      handleClose();
      setDragCurrentY(0);
    } else {
      setDragCurrentY(0);
    }

    setIsDragging(false);
  }, [isDragging, dragCurrentY, handleClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY;

    if (diff > 0) {
      setDragCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (dragCurrentY > 150) {
      handleClose();
      setDragCurrentY(0);
    } else {
      setDragCurrentY(0);
    }

    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartY(e.clientY);
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isOpen) {
      setDragCurrentY(0);
      setIsDragging(false);
    }
  }, [isOpen]);

  const shouldShow = isOpen || isClosing;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="desktop:hidden fixed inset-0 z-40 bg-black/70"
        onClick={handleClose}
        style={{
          opacity: isDragging ? Math.max(0, 1 - dragCurrentY / 300) : isOpen && !isClosing ? 1 : 0,
          visibility: shouldShow ? 'visible' : 'hidden',
          transition: isDragging ? 'none' : 'opacity 0.3s, visibility 0.3s',
        }}
      />
      {/* 바텀 시트 */}
      <div
        ref={sheetRef}
        className="desktop:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-gray-200"
        style={{
          height: 'calc(100vh - 60px)',
          maxHeight: 'calc(100vh - 60px)',
          transform: isDragging
            ? `translateY(${dragCurrentY}px)`
            : isOpen && !isClosing
              ? 'translateY(0)'
              : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          visibility: shouldShow ? 'visible' : 'hidden',
        }}
      >
        <div
          className="flex cursor-grab justify-center pt-3 pb-2 active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="h-[3px] w-9.5 rounded-full bg-gray-400" />
        </div>
        <div className="h-full overflow-y-auto pb-5">{children}</div>
      </div>
    </>
  );
};

export default BottomComment;
