'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownSelectProps {
  options: { label: string; value: string }[];
  defaultLabel?: string;
  onSelect?: (value: string) => void;
}

const DropdownSelect = ({ options, defaultLabel = '지원분야', onSelect }: DropdownSelectProps) => {
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
        className={`body-7 flex w-[100px] items-center justify-between rounded-md bg-gray-200 pl-3 text-gray-700 transition-colors`}
      >
        <span>{selected?.label || defaultLabel}</span>
        <Image
          src={`/icons/profile_dropdown_${isOpen ? 'up' : 'down'}.svg`}
          alt="arrow"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 rounded-md bg-gray-200 text-gray-700">
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`body-7 w-[100px] cursor-pointer pr-6 pl-3 ${
                index === 0 ? '' : 'border-t border-gray-300'
              } ${selected === option ? 'bg-gray-300' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
