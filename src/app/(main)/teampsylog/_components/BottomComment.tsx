'use client';

import React from 'react';
import useBottomSheetDrag from './useBottomSheetDrag';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomComment = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const {
    dragCurrentY,
    isDragging,
    isClosing,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClose,
    shouldShow,
  } = useBottomSheetDrag({ isOpen, onClose });

  return (
    <>
      <div
        className="desktop:hidden fixed inset-0 z-40 bg-black/70"
        onClick={handleClose}
        style={{
          opacity: isDragging ? Math.max(0, 1 - dragCurrentY / 300) : isOpen && !isClosing ? 1 : 0,
          visibility: shouldShow ? 'visible' : 'hidden',
          pointerEvents: shouldShow ? 'auto' : 'none',
          transition: isDragging ? 'none' : 'opacity 0.3s, visibility 0.3s',
        }}
      />
      {/* 바텀 시트 */}
      <div
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
          pointerEvents: shouldShow ? 'auto' : 'none',
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
