'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Option = { label: string; value: string };

type InlineDropdownProps = {
  value?: string;
  onSelect?: (opt: Option) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  disabled?: boolean; // 선택 후 잠금용
};

export default function PositionDropdown({
  value = '',
  onSelect,
  placeholder = '모집분야 선택',
  options,
  className = '',
  disabled = false,
}: InlineDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const isPlaceholder = !selected;

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const listBoxBase =
    'absolute left-[-1px] z-10 top-[41px] rounded-b-md border border-gray-300 bg-white whitespace-nowrap';

  return (
    <div ref={wrapRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={[
          'border-gray-0 inline-flex items-center rounded-md border',
          isPlaceholder ? 'text-gray-500' : 'text-gray-800',
          disabled ? '' : 'cursor-pointer',
        ].join(' ')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="body-5 pl-7">{isPlaceholder ? placeholder : selected?.label}</span>
        {isPlaceholder ? (
          <Image
            src={open ? '/icons/arrow-up-gray.svg' : '/icons/arrow-down-gray.svg'}
            alt=""
            width={20}
            height={20}
            className="ml-2 h-5 w-5"
            aria-hidden
          />
        ) : null}
      </button>

      {open && (
        <ul
          role="listbox"
          className={`${listBoxBase} w-max max-w-[90vw] overflow-y-auto`}
          style={{ maxHeight: 196 }}
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={[
                'body-5 cursor-pointer border-b border-gray-300 select-none',
                'hover:bg-primary-50 px-7 py-3 text-gray-800',
                idx === options.length - 1 ? 'rounded-b-md' : '',
              ].join(' ')}
              onClick={() => {
                onSelect?.(opt);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
