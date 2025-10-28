import { ChangeEvent, useState } from 'react';

interface ApplyMessageFieldProps {
  placeholder?: string;
  maxLength?: number;
}

const MessageTextarea = ({
  placeholder = '기술보다 중요한 건 함께하는 태도예요.\n어떤 마음으로 이 프로젝트에 참여하고 싶은지 적어주세요. (250자 내외, 선택사항)',
  maxLength = 250,
}: ApplyMessageFieldProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const isOverLimit = value.length > maxLength;

  return (
    <main className="flex flex-col gap-4">
      <p className="title-3 text-gray-800">글 작성자에게 하고 싶은 말을 적어주세요</p>
      <div className="flex flex-col gap-2">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          className={`body-6 bg-gray-0 resize-none rounded-lg border px-8 pt-5 pb-7.5 transition-colors ${
            isOverLimit
              ? 'border-red-100 text-gray-800'
              : isFocused
                ? 'border-gray-600 text-gray-800'
                : 'border-gray-400 text-gray-500'
          } placeholder-gray-400 focus:outline-none ${!isOverLimit ? 'mb-4' : ''}`}
        />
        {isOverLimit && <p className="body-8 text-red-100">250자 내로 작성해주세요</p>}
      </div>
    </main>
  );
};

export default MessageTextarea;
