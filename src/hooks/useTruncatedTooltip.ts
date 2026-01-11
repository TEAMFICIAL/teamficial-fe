import { useEffect, useRef, useState } from 'react';

interface UseTruncatedTooltipOptions {
  text: string;
  maxLength?: number;
  isMobile?: boolean;
}

interface TooltipPos {
  left: number;
  top: number;
}

export function useTruncatedTooltip({
  text,
  maxLength = 5,
  isMobile = false,
}: UseTruncatedTooltipOptions) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getTextLengthWithoutSpaces = (t: string) => t.replace(/\s/g, '').length;
  const limit = typeof maxLength === 'number' ? maxLength : 5;
  const isTruncated = getTextLengthWithoutSpaces(text) > limit;

  let displayText = text;
  if (isTruncated) {
    let count = 0;
    displayText = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') count++;
      if (count > limit) {
        displayText += '...';
        break;
      }
      displayText += text[i];
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMobile && isTruncated) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setTooltipPos({ left: rect.left + window.scrollX, top: rect.bottom + window.scrollY });
      setShowTooltip(true);
    }
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipPos(null);
  };

  const handleTouch = (e: React.TouchEvent<HTMLElement>) => {
    if (isMobile && isTruncated) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setTooltipPos({ left: rect.left + window.scrollX, top: rect.bottom + window.scrollY });
      setShowTooltip(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
        setTooltipPos(null);
      }, 1500);
    }
  };

  return {
    ref,
    showTooltip,
    tooltipPos,
    displayText,
    isTruncated,
    handleMouseEnter,
    handleMouseLeave,
    handleTouch,
  };
}
