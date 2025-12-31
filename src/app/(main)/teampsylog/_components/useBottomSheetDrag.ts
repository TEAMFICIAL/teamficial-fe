import { useCallback, useEffect, useState } from 'react';

interface UseBottomSheetDragProps {
  isOpen: boolean;
  onClose: () => void;
}

const useBottomSheetDrag = ({ isOpen, onClose }: UseBottomSheetDragProps) => {
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  return {
    dragCurrentY,
    isDragging,
    isClosing,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClose,
    shouldShow,
  };
};

export default useBottomSheetDrag;
