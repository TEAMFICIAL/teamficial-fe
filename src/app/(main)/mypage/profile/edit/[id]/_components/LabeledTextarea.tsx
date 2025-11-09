'use client';

interface LabeledTextareaProps {
  label: string;
  placeholder: string;
  iconSrc?: string;
  className?: string;
}

import Image from 'next/image';
import clsx from 'clsx';

const LabeledTextarea = ({ label, placeholder, iconSrc, className }: LabeledTextareaProps) => {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <p className="title-3 text-gray-900">{label}</p>
      <div className={clsx('flex items-center gap-4')}>
        {iconSrc && <Image src={iconSrc} alt="icon" width={28} height={28} />}
        <textarea
          rows={1}
          placeholder={placeholder}
          className="body-6 flex w-full resize-none rounded-lg border border-gray-300 px-7 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LabeledTextarea;
