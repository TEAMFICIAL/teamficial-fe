'use client';

import React from 'react';
import ProjectDropdown from './ProjectDropdown';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';

// TODO: 상수 가져와서 사용
const DURATION_OPTIONS = [
  { label: '1개월 이내', value: 'WITHIN_1_MONTH' },
  { label: '1~2개월', value: 'ONE_TO_TWO_MONTHS' },
  { label: '약 3개월', value: 'AROUND_3_MONTHS' },
  { label: '3~6개월', value: 'THREE_TO_SIX_MONTHS' },
  { label: '6개월 이상(장기)', value: 'OVER_6_MONTHS' },
  { label: '미정/협의예정', value: 'FLEXIBLE' },
];

type Props = {
  control: Control<RecruitFormType>;
};

const ProjectDuration = ({ control }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">프로젝트 진행기간</p>
      <Controller
        name="period"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <ProjectDropdown
              name="period"
              value={value}
              onChange={onChange}
              options={DURATION_OPTIONS}
            />
          </div>
        )}
      />
    </div>
  );
};

export default ProjectDuration;
