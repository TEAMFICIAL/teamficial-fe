'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Option = { label: string; value: string };

type DropdownProps = {
  name?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  required?: boolean;
};

const ProjectDropdown = ({
  name,
  value = '',
  onChange,
  placeholder = '진행기간을 선택해 주세요',
  options,
  className = '',
  required,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const isPlaceholder = !value;
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value],
  );

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      role="combobox"
      aria-controls={`${name}-listbox`}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      <button
        type="button"
        className={`flex w-full items-center justify-between border border-gray-300 bg-white px-7 py-3 focus:border-gray-500 ${open ? 'rounded-t-md rounded-b-none' : 'rounded-md'} ${isPlaceholder ? 'text-gray-500' : 'text-gray-800'} `}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((p) => !p);
          }
          if (e.key === 'Escape') setOpen(false);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {isPlaceholder ? (
          <span className="body-8 desktop:body-6">{placeholder}</span>
        ) : (
          <span className="body-7 desktop:body-5">{selectedLabel}</span>
        )}
        <Image
          src={open ? '/icons/arrow-up-gray.svg' : '/icons/arrow-down-gray.svg'}
          alt={open ? '드롭다운 열림' : '드롭다운 닫힘'}
          width={24}
          height={24}
          className="ml-3 h-6 w-6 text-gray-400 transition-transform"
        />
      </button>

      {open && (
        <ul
          id={name ? `${name}-listbox` : undefined}
          role="listbox"
          className={[
            'absolute top-full right-0 left-0 z-10',
            'border border-t-0 border-gray-300 bg-white',
            'divide-y divide-gray-300 rounded-b-md',
          ].join(' ')}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isLast = idx === options.length - 1;

            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={[
                  'cursor-pointer px-7 py-3',
                  'hover:bg-primary-50 desktop:body-6 body-8',
                  isLast ? 'rounded-b-md' : '',
                ].join(' ')}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
      {name && (
        <input type="hidden" name={name} value={value} required={required && !isPlaceholder} />
      )}
    </div>
  );
};
export default ProjectDropdown;
