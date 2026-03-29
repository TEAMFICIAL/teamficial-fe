'use client';

import React from 'react';
import useBottomSheetDrag from './useBottomSheetDrag';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomComment = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const sheetHeight = Math.round(typeof window !== 'undefined' ? window.innerHeight * 0.7 : 500);

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
  } = useBottomSheetDrag({ isOpen, onClose, sheetHeight });

  return (
    <>
      <div
        className={`desktop:hidden fixed inset-0 z-40 bg-black/70 ${shouldShow ? 'block' : 'hidden'}`}
        onClick={handleClose}
        style={{
          opacity: isDragging ? Math.max(0, 1 - dragCurrentY / 300) : isOpen && !isClosing ? 1 : 0,
          transition: isDragging ? 'none' : 'opacity 0.3s',
        }}
      />
      {/* 바텀 시트 */}
      <div
        className={`desktop:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-gray-200 ${shouldShow ? 'flex' : 'hidden'}`}
        style={{
          height: '70vh',
          maxHeight: '70vh',
          flexDirection: 'column',
          transform: isDragging
            ? `translateY(${dragCurrentY}px)`
            : isOpen && !isClosing
              ? 'translateY(0)'
              : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          pointerEvents: shouldShow ? 'auto' : 'none',
          overscrollBehavior: 'contain',
        }}
      >
        <div
          className="flex cursor-grab justify-center pt-3 pb-2 active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="h-[3px] w-9.5 rounded-full bg-gray-400" />
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto pb-5"
          style={{ overscrollBehavior: 'contain' }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomComment;
