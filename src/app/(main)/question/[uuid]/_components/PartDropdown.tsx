'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useOutsideClick';

const options = ['기획', '디자인', '프론트엔드', '백엔드'];

interface PartDropdownProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const PartDropdown = ({ selected, onSelect }: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const getIconSrc = () => {
    if (!selected) return isOpen ? '/icons/question_gray_up.svg' : '/icons/question_gray_down.svg';
    return isOpen ? '/icons/question_up.svg' : '/icons/question_down.svg';
  };

  return (
    <div ref={dropdownRef} className="bg-gray-0 relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'tablet:title-4 body-8 tablet:px-4.5 tablet:py-2 flex items-center justify-between gap-2 rounded-lg border border-gray-300 px-3 py-2 text-gray-500 transition',
          isOpen && 'border-gray-400',
        )}
      >
        <span className={clsx(selected ? 'text-gray-800' : 'text-gray-500')}>
          {selected || '예시) 기획'}
        </span>
        <Image src={getIconSrc()} alt="arrow" width={20} height={20} className="cursor-pointer" />
      </button>

      {isOpen && (
        <ul className="tablet:title-4 body-8 bg-gray-0 absolute z-10 w-full rounded-lg border border-gray-300">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                'tablet:px-4.5 tablet:py-2 cursor-pointer border-b border-gray-300 px-3 py-2 text-gray-800 last:border-b-0',
                selected === option && 'bg-primary-50',
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

export default PartDropdown;
