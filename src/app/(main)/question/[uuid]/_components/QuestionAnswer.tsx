'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface QuestionAnswerProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  maxLength?: number;
}

const QuestionAnswer = ({ value, onChange, hasError, maxLength = 250 }: QuestionAnswerProps) => {
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  const isOverLimit = charCount > maxLength;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div
      className={clsx(
        'bg-gray-0 tablet:body-6 body-8 tablet:px-8 tablet:py-5 flex flex-col rounded-md border border-gray-300 px-5 py-4 transition-all duration-200',
        isOverLimit || hasError
          ? 'border-red-100 focus-within:border-red-100'
          : 'border-gray-300 focus-within:border-gray-600',
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="질문에 대한 답을 입력해주세요(최대 250자)"
        className="flex w-full resize-none overflow-hidden border border-none text-gray-700 placeholder-gray-500 focus:outline-none"
        rows={2}
      />
      <span
        className={clsx(
          'body-10 tablet:body-8 flex h-6 justify-end text-gray-500 transition-colors duration-200',
          isOverLimit && 'text-red-100',
        )}
      >
        {charCount}/{maxLength}자
      </span>
    </div>
  );
};

export default QuestionAnswer;
