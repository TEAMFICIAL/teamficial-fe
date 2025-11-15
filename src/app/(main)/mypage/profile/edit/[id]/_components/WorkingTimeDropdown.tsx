'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { WORKING_TIME_OPTIONS, WORKING_VALUE_MAP } from '@/constants/Dropdown';
import useOutsideClick from '@/hooks/useOutsideClick';

interface WorkTimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const WorkTimeDropdown = ({ value, onChange }: WorkTimeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const normalizedValue = useMemo(() => {
    if (!value) return '';
    if (Object.values(WORKING_VALUE_MAP).includes(value)) return value;
    return WORKING_VALUE_MAP[value] || '';
  }, [value]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = WORKING_TIME_OPTIONS.find((opt) => opt.value === normalizedValue);
  const selectedLabel = selectedOption ? selectedOption.label : '';

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'body-6 flex w-full items-center justify-between rounded-lg border border-gray-300 px-7 py-3 text-left focus:outline-none',
          selectedLabel ? 'text-gray-800' : 'text-gray-500',
          isOpen && 'rounded-b-none border-b-0',
        )}
      >
        <span>{selectedLabel || '선호하는 작업 시간대를 선택해주세요'}</span>
        <Image
          src={isOpen ? '/icons/question_gray_up.svg' : '/icons/question_gray_down.svg'}
          alt="arrow"
          width={24}
          height={24}
          className={clsx(
            'cursor-pointer transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>

      {isOpen && (
        <ul className="body-6 absolute z-10 w-full rounded-b-lg border border-t border-gray-300 bg-white text-gray-800">
          {WORKING_TIME_OPTIONS.map((option, idx) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={clsx(
                'hover:bg-primary-50 cursor-pointer px-7 py-3 text-gray-800',
                value === option.value && 'bg-primary-50',
                idx !== WORKING_TIME_OPTIONS.length - 1 && 'border-b border-gray-300',
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkTimeDropdown;
