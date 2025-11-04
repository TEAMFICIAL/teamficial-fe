'use client';

import React from 'react';
import RadioButton from './RadioButton';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { DURATION_OPTIONS } from '@/constants/Dropdown';

type Props = {
  control: Control<RecruitFormType>;
  error?: string;
};

const ProcessMethod = ({ control, error }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">진행 방법</p>
      <Controller
        name="progressWay"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <div className="flex gap-6">
              {DURATION_OPTIONS.map((option) => (
                <RadioButton
                  key={option.value}
                  id={option.value}
                  name="progressWay"
                  value={option.value}
                  checked={value === option.value}
                  label={option.label}
                  onChange={onChange}
                />
              ))}
            </div>
            {error && <span className="body-6 text-red-100">{error}</span>}
          </div>
        )}
      />
    </div>
  );
};

export default ProcessMethod;
