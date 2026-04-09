import React from 'react';

interface KeywordGuideBalloonProps {
  position: 'top' | 'bottom';
  share?: boolean;
  onClose: () => void;
  text?: string;
  balloonClassName?: string; // 말풍선 위치 오버라이드
}

const KeywordGuideBalloon: React.FC<KeywordGuideBalloonProps> = ({
  position,
  share = false,
  onClose,
  text = '변경할 대표 키워드를\n먼저 선택하세요',
  balloonClassName,
}) => {
  return (
    <div
      className={`absolute z-50 flex items-center bg-gray-800 px-4 py-2 text-white shadow-lg ${
        share ? 'rounded-lg' : 'rounded'
      } ${balloonClassName ?? (share ? 'right-4' : 'left-1/2 -translate-x-1/2')} ${
        position === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
      }`}
    >
      <div className="relative flex min-h-6 items-center justify-between gap-2">
        <span className="body-10 desktop:body-8 text-start whitespace-pre-line">{text}</span>
        <button
          onClick={onClose}
          className="flex h-4 w-4 flex-shrink-0 items-center justify-center p-0 text-base text-white/70 hover:text-white focus:outline-none"
        >
          ✕
        </button>
      </div>
      {/* 꼬리 */}
      <div
        className={`absolute h-0 w-0 border-x-[6px] border-x-transparent ${
          share ? 'right-3' : 'left-1/2 -translate-x-1/2'
        } ${
          position === 'top'
            ? 'top-full border-t-[9px] border-t-gray-800'
            : 'bottom-full border-b-[9px] border-b-gray-800'
        }`}
      />
    </div>
  );
};

export default KeywordGuideBalloon;
