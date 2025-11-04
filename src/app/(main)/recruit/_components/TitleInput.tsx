'use client';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { title } from 'process';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  name: 'title';
  control: Control<RecruitFormType>;
};

const TitleInput = ({ name, control }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-2">
          <input
            className={`body-1 h-18 rounded-lg border-1 border-gray-300 px-8 text-gray-800 placeholder:text-gray-500 ${title.length > 30 ? 'border-red-100' : 'focus:border-gray-600'}`}
            placeholder="제목을 입력해주세요 (최대30자)"
            value={value}
            onChange={onChange}
          />
          {value.length > 30 && (
            <span className={`body-8 text-gray-500 ${value.length > 30 ? 'text-red-100' : ''}`}>
              제목을 30자 이하로 입력해주세요
            </span>
          )}
        </div>
      )}
    />
  );
};

export default TitleInput;
