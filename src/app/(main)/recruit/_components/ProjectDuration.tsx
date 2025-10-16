'use client';
import React, { useState } from 'react';
import ProjectDropdown from './ProjectDropdown';

// TODO: 서버 명세서 확인 후 value 교체
const DURATION_OPTIONS = [
  { label: '1개월 이내', value: '1m' },
  { label: '1~2개월', value: '2m' },
  { label: '약 3개월', value: '3m' },
  { label: '3~6개월', value: '6m' },
  { label: '6개월 이상(장기)', value: '9m' },
  { label: '미정/협의예정', value: 'none' },
];

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const ProjectDuration = ({ defaultValue, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">프로젝트 진행기간</p>
      <ProjectDropdown
        name="duration"
        value={value}
        onChange={handleChange}
        options={DURATION_OPTIONS}
      />
    </div>
  );
};

export default ProjectDuration;
