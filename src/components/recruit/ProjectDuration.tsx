'use client';

import React from 'react';
import ProjectDropdown from './ProjectDropdown';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { PERIOD_OPTIONS } from '@/constants/Dropdown';

type Props = {
  control: Control<RecruitFormType>;
};

const ProjectDuration = ({ control }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="body-5 desktop:title-3">프로젝트 진행기간</p>
      <Controller
        name="period"
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <ProjectDropdown
              name="period"
              value={value}
              onChange={onChange}
              options={PERIOD_OPTIONS}
            />
          </div>
        )}
      />
    </div>
  );
};

export default ProjectDuration;
