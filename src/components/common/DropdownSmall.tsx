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

const DropdownSmall = ({
  name,
  value = '',
  onChange,
  placeholder = '',
  options,
  className = '',
  required,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [openWidth, setOpenWidth] = useState<number | null>(null);

  const isPlaceholder = !value;
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value],
  );

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setOpenWidth(null);
      return;
    }

    const measureWidth = () => {
      const btnW = buttonRef.current?.getBoundingClientRect().width ?? 0;
      const measW = measureRef.current?.getBoundingClientRect().width ?? 0;
      const menuW = menuRef.current?.getBoundingClientRect().width ?? 0;
      setOpenWidth(Math.max(btnW, measW, menuW));
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [open, options, selectedLabel, placeholder]);

  return (
    <div
      ref={wrapRef}
      className={`relative inline-block flex-none ${className}`}
      role="combobox"
      aria-controls={`${name}-listbox`}
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <button
        ref={buttonRef}
        type="button"
        style={open && openWidth ? { width: openWidth } : undefined}
        className={`tablet:body-6 body-8 tablet:px-4 tablet:py-3 bg-gray-0 inline-flex cursor-pointer items-center justify-between border px-3 py-2 transition-[width] duration-150 ${open ? 'rounded-t-md rounded-b-none' : 'rounded-md'} ${isPlaceholder ? 'border-gray-300 text-gray-800' : 'text-primary-900 bg-primary-50 border-primary-900'} `}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((p) => !p);
          }
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <span className="body-5">{isPlaceholder ? placeholder : selectedLabel}</span>
        <Image
          src={
            isPlaceholder
              ? open
                ? '/icons/arrow-up-gray.svg'
                : '/icons/arrow-down-gray.svg'
              : open
                ? '/icons/arrow-up-primary.svg'
                : '/icons/arrow-down-primary.svg'
          }
          alt=""
          width={24}
          height={24}
          className="ml-1.25 h-6 w-6 text-gray-400 transition-transform"
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={menuRef}
          id={name ? `${name}-listbox` : undefined}
          role="listbox"
          style={openWidth ? { width: openWidth } : undefined}
          className={`absolute top-full left-0 z-10 max-h-[196px] cursor-pointer divide-y divide-gray-300 overflow-y-auto rounded-b-md border border-t-0 border-gray-300 bg-white whitespace-nowrap`}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`tablet:body-5 body-8 tablet:px-4 tablet:py-3 flex items-center justify-center px-3 py-2 ${idx === options.length - 1 ? 'rounded-b-md' : ''} ${
                  isSelected ? 'bg-primary-50' : 'hover:bg-primary-50 text-gray-800'
                }`}
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

      {/* 최대 너비 측정용 */}
      <div className="fixed top-0 -left-[9999px] inline-block">
        <div ref={measureRef} className="inline-flex items-center border px-4 py-3">
          <span className="body-5">{isPlaceholder ? placeholder : selectedLabel}</span>
          {/* 아이콘 공간(24px + margin-left 1.25) 반영 */}
          <span className="inline-block" style={{ width: 24, marginLeft: '0.3125rem' }} />
        </div>
        <div className="inline-block whitespace-nowrap">
          {options.map((o) => (
            <div key={o.value} className="inline-block px-4 py-3">
              {o.label}
            </div>
          ))}
        </div>
      </div>

      {name && (
        <input type="hidden" name={name} value={value} required={required && !isPlaceholder} />
      )}
    </div>
  );
};

export default DropdownSmall;
