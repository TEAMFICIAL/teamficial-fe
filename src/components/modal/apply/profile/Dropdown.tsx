'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownSelectProps {
  options: { label: string; value: string }[];
  defaultLabel?: string;
  onSelect?: (value: string) => void;
}

const DropdownSelect = ({
  options,
  defaultLabel = '지원분야를 선택해주세요',
  onSelect,
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: { label: string; value: string }) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option.value);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`body-6 flex w-full items-center justify-between border border-gray-300 bg-white px-7 py-3 focus:border-gray-500 ${isOpen ? 'rounded-t-md rounded-b-none' : 'rounded-md'} `}
      >
        <span className={selected ? '' : 'text-gray-500'}>{selected?.label || defaultLabel}</span>
        <Image
          src={`/icons/profile_dropdown_${isOpen ? 'up' : 'down'}.svg`}
          alt="arrow"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>

      {isOpen && (
        <ul
          className={[
            'absolute top-full right-0 left-0 z-10',
            'border border-t-0 border-gray-300 bg-white',
            'divide-y divide-gray-300 rounded-b-md',
          ].join(' ')}
        >
          {options.map((option, idx) => {
            const isLast = idx === options.length - 1;

            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={[
                  'cursor-pointer px-7 py-3',
                  'hover:bg-primary-50 body-6',
                  isLast ? 'rounded-b-md' : '',
                ].join(' ')}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
