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
    <div className={clsx('tablet:gap-4 flex flex-col gap-2', className)}>
      <p className="tablet:title-3 body-5 text-gray-900">{label}</p>
      <div className={clsx('tablet:gap-4 flex items-center gap-2')}>
        {iconSrc && (
          <Image
            src={iconSrc}
            alt="icon"
            width={28}
            height={28}
            className="tablet:w-7 tablet:h-7 h-5 w-5"
          />
        )}
        <textarea
          rows={1}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="tablet:body-6 body-8 tablet:px-7 flex w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LabeledTextarea;
