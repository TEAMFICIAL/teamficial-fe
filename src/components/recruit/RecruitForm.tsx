'use client';
import React from 'react';
import { isAfter, parse } from 'date-fns';
import TitleInput from './TitleInput';
import ProcessMethod from './ProcessMethod';
import ProjectDuration from './ProjectDuration';
import RecruitPosition from './RecruitPosition';
import ProjectDate from './ProjectDate';
import TextInput from './TextInput';
import TextContent from './editor/TextContent';
import ProfileSlider from './profile/ProfileSlider';
import Button from '@/components/common/Button';
import { Project } from '@/types/project';
import { useRecruitForm } from './useRecruitForm';

type RecruitFormProps = {
  mode?: 'create' | 'edit';
  initialData?: Project;
  postId?: number;
};

const RecruitForm = ({ mode = 'create', initialData, postId }: RecruitFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
    onSubmit,
    onError,
  } = useRecruitForm({ mode, initialData, postId });

  const startDate = watch('startDate');
  const deadline = watch('deadline');

  const isEndDateInvalid = (deadline: string, startDate: string) => {
    if (!startDate || !deadline) return true;

    try {
      const start = parse(startDate, 'yyyy-MM-dd', new Date());
      const end = parse(deadline, 'yyyy-MM-dd', new Date());
      return !isAfter(end, start);
    } catch {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <TitleInput control={control} name="title" />
        <div className="flex flex-col gap-8 rounded-2xl border-1 border-gray-300 p-8">
          {/* 모집분야/인원 */}
          <RecruitPosition control={control} />
          {/* 진행방법 */}
          <ProcessMethod control={control} />
          {/* 프로젝트 기간 및 연락처 */}
          <div className="flex flex-col gap-6">
            <ProjectDate title="프로젝트 시작 예정일" name="startDate" control={control} />
            <ProjectDuration control={control} />
            <ProjectDate
              title="공고 마감일"
              name="deadline"
              control={control}
              error={
                !isEndDateInvalid(deadline, startDate)
                  ? '마감일은 시작일 이후일 수 없습니다'
                  : errors.deadline?.message
              }
            />
            <TextInput title="연락 방법" name="contactWay" control={control} />
          </div>
        </div>
        <TextContent control={control} name="content" />
        {mode === 'create' && <ProfileSlider control={control} />}
      </div>
      <div className="mt-6 mb-10 flex justify-end">
        <Button
          type="submit"
          label={mode === 'edit' ? '수정하기' : '업로드하기'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default RecruitForm;
