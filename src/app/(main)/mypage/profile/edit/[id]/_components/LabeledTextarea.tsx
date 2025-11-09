'use client';

interface LabeledTextareaProps {
  id: string;
  label: string;
  placeholder: string;
  iconSrc?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

import Image from 'next/image';
import clsx from 'clsx';

const LabeledTextarea = ({
  id,
  label,
  placeholder,
  iconSrc,
  className,
  value,
  onChange,
}: LabeledTextareaProps) => {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <p className="title-3 text-gray-900">{label}</p>
      <div className={clsx('flex items-center gap-4')}>
        {iconSrc && <Image src={iconSrc} alt="icon" width={28} height={28} />}
        <textarea
          rows={1}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="body-6 flex w-full resize-none rounded-lg border border-gray-300 px-7 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LabeledTextarea;
