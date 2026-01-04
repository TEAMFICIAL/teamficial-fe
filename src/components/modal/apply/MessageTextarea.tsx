import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

interface ApplyMessageFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  className?: string;
}

const MessageTextarea = ({
  value,
  onChange,
  placeholder = '기술보다 중요한 건 함께하는 태도예요.\n어떤 마음으로 이 프로젝트에 참여하고 싶은지 적어주세요. (250자 내외, 선택사항)',
  maxLength = 250,
  readOnly = false,
  className,
}: ApplyMessageFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const isOverLimit = value.length > maxLength;
  const isActive = readOnly ? true : isFocused;

  return (
    <main className={clsx('desktop:gap-4 flex flex-col gap-2', className)}>
      <p className="body-7 desktop:title-3 text-gray-800">
        글 작성자에게 하고 싶은 말을 적어주세요
      </p>
      <div className="flex flex-col gap-2">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly}
          className={`desktop:body-6 body-9 bg-gray-0 desktop:px-8 desktop:pt-5 desktop:pb-7.5 min-h-22 resize-none rounded-lg border p-4 transition-colors ${
            isOverLimit
              ? 'border-red-100 text-gray-800'
              : isActive
                ? 'border-gray-600 text-gray-700'
                : 'border-gray-400 text-gray-500'
          } placeholder-gray-400 focus:outline-none ${!isOverLimit ? 'mb-4' : ''}`}
        />
        {isOverLimit && (
          <p className="desktop:body-8 body-10 text-red-100">250자 내로 작성해주세요</p>
        )}
      </div>
    </main>
  );
};

export default MessageTextarea;
