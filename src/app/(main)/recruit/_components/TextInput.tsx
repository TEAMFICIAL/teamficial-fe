import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';

type Props = {
  title: string;
  name: 'contactWay';
  control: Control<RecruitFormType>;
  error?: string;
  placeholder?: string;
};

const TextInput = ({
  title,
  name,
  control,
  error,
  placeholder = 'Ex. 카카오톡 오픈채팅 링크',
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">{title}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <input
              value={value}
              onChange={onChange}
              className={`body-6 rounded-md border-1 p-2 px-7 py-3 focus:border-gray-500 ${
                error ? 'border-red-100' : 'border-gray-300'
              }`}
              placeholder={placeholder}
            />
            {error && <span className="body-6 text-red-100">{error}</span>}
          </div>
        )}
      />
    </div>
  );
};

export default TextInput;
