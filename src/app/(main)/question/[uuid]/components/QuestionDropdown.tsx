'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useOutsideClick';

interface QuestionDropdownProps {
  hasError?: boolean;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const QuestionDropdown = ({ options, selected, onSelect, hasError }: QuestionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'bg-gray-0 flex w-full cursor-pointer items-center justify-between rounded-lg border px-7 py-3 transition',
          hasError
            ? 'border-red-100 focus:border-red-100'
            : 'border-gray-300 focus:border-gray-600',
        )}
      >
        <span className={clsx(selected ? 'body-6 text-gray-700' : 'body-6 text-gray-500')}>
          {selected || '질문을 선택해주세요'}
        </span>
        <Image
          src={isOpen ? '/icons/question_gray_up.svg' : '/icons/question_gray_down.svg'}
          alt="toggle"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <ul className="bg-gray-0 absolute z-10 w-full rounded-lg border border-gray-300">
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                'cursor-pointer px-7 py-3 text-gray-700',
                selected === option && 'bg-primary-50',
                index !== options.length - 1 && 'border-b border-gray-300',
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionDropdown;
