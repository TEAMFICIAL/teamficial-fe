'use client';

import clsx from 'clsx';

interface QuestionAnswerProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

const QuestionAnswer = ({ value, onChange, hasError }: QuestionAnswerProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="질문에 대한 답을 입력해주세요(최대 250자)"
      className={clsx(
        'body-6 bg-gray-0 flex resize-none rounded-md border px-8 pt-5 pb-7.5 text-gray-700 placeholder-gray-500 focus:outline-none',
        hasError ? 'border-red-100 focus:border-red-100' : 'border-gray-300 focus:border-gray-600',
      )}
    />
  );
};

export default QuestionAnswer;
