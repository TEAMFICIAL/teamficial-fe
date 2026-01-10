'use client';

import React from 'react';
import RadioButton from './RadioButton';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { DURATION_OPTIONS } from '@/constants/Dropdown';

type Props = {
  control: Control<RecruitFormType>;
};

const ONLINE_VALUE = DURATION_OPTIONS[1]?.value;

const ProcessMethod = ({ control }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="desktop:title-3 body-5">진행 방법</p>
      <Controller
        name="progressWay"
        control={control}
        render={({ field: { value, onChange } }) => {
          if (value === undefined && ONLINE_VALUE) {
            onChange(ONLINE_VALUE);
          }
          return (
            <div className="flex flex-col gap-2">
              <div className="desktop:gap-6 desktop:flex-row flex flex-col gap-4">
                {DURATION_OPTIONS.slice(1).map((option) => (
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
            </div>
          );
        }}
      />
    </div>
  );
};

export default ProcessMethod;
