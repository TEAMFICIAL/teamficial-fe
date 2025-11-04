import { format, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

type Props = {
  title: string;
  name: 'startDate' | 'deadline';
  control: Control<RecruitFormType>;
  error?: string;
};

const ProjectDate = ({ title, name, control, error }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const parseDate = (dateString: string) => {
    try {
      return dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="flex flex-col gap-4" ref={ref}>
      <p className="title-3">{title}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <div
              className={`body-6 relative flex cursor-pointer items-center justify-between gap-2 rounded-md border-1 border-gray-300 px-7 py-3 focus:border-gray-500`}
              onClick={() => {
                if (!open) setOpen(true);
              }}
            >
              <span className={value ? 'text-gray-800' : 'text-gray-500'}>
                {value || '년-월-일을 선택해 주세요'}
              </span>
              <Image src="/icons/calendar.svg" alt="calendar" width={24} height={24} />
              {open && (
                <div className="absolute top-full right-0 z-20">
                  <DatePicker
                    selected={parseDate(value)}
                    onChange={(date: Date | null) => {
                      if (date && !isNaN(date.getTime())) {
                        onChange(format(date, 'yyyy-MM-dd'));
                        setOpen(false);
                      }
                    }}
                    inline
                    calendarClassName="rounded-lg border border-gray-300 bg-white"
                  />
                </div>
              )}
            </div>
            {error && <span className="body-8 text-red-100">{error}</span>}
          </div>
        )}
      />
    </div>
  );
};

export default ProjectDate;
