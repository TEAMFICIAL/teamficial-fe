'use client';
import React from 'react';
import TitleInput from './TitleInput';
import ProcessMethod from './ProcessMethod';
import ProjectDuration from './ProjectDuration';
import RecruitPosition from './RecruitPosition';
import ProjectDate from './ProjectDate';
import TextInput from './TextInput';
import TextContent from './editor/TextContent';
import Button from '@/components/common/Button';
import { useCreateProject } from '@/hooks/mutation/useCreateProject';
import { useUpdateProject } from '@/hooks/mutation/useUpdateProject';
import { useForm } from 'react-hook-form';
import {
  createRecruitFormSchema,
  recruitFormSchema,
  RecruitFormType,
} from '@/libs/schemas/projectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProject, Project } from '@/types/project';
import { isAfter, parse } from 'date-fns';
import ProfileSlider from './profile/ProfileSlider';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import { PositionType } from '@/utils/position';

type RecruitFormProps = {
  mode?: 'create' | 'edit';
  initialData?: Project;
  postId?: number;
};

const RecruitForm = ({ mode = 'create', initialData, postId }: RecruitFormProps) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { mutate: createProject } = useCreateProject();
  const { mutate: updateProject } = useUpdateProject();

  const convertDateFormat = (dateString: string) => {
    if (!dateString) return '';
    return dateString.replace(/\./g, '-');
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<RecruitFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(mode === 'edit' ? recruitFormSchema : createRecruitFormSchema),
    defaultValues:
      mode === 'edit' && initialData
        ? {
            title: initialData.title,
            recruitingPositions: initialData.recruitingPositions,
            progressWay: initialData.progressWay,
            startDate: convertDateFormat(initialData.startDate),
            period: initialData.period,
            deadline: convertDateFormat(initialData.deadline),
            contactWay: initialData.contactWay,
            content: initialData.content,
            profileId: undefined,
          }
        : {
            title: '',
            recruitingPositions: [{ position: '' as PositionType, count: 1 }],
            progressWay: undefined,
            startDate: '',
            period: undefined,
            deadline: '',
            contactWay: '',
            content: '',
            profileId: undefined,
          },
  });

  const onSubmit = (formData: RecruitFormType) => {
    try {
      if (mode === 'edit' && postId) {
        // 수정 모드
        const projectData: Project = {
          title: formData.title,
          recruitingPositions: formData.recruitingPositions,
          progressWay: formData.progressWay!,
          startDate: formData.startDate,
          period: formData.period!,
          deadline: formData.deadline,
          contactWay: formData.contactWay,
          content: formData.content,
          status: initialData?.status || 'OPEN',
        };

        updateProject(
          { postId, project: projectData },
          {
            onSuccess: (response) => {
              console.log('프로젝트 수정 성공:', response);
              router.push(`/project/${postId}`);
            },
            onError: (error) => {
              console.error('프로젝트 수정 실패:', error);
            },
          },
        );
      } else {
        // 생성 모드
        if (!formData.profileId) {
          console.error('프로필이 선택되지 않았습니다.');
          return;
        }

        const projectData: CreateProject = {
          ...formData,
          profileId: formData.profileId,
          status: 'OPEN',
        };

        console.log('폼 데이터:', projectData);

        createProject(projectData, {
          onSuccess: (response) => {
            console.log('프로젝트 생성 성공:', response);
            openModal('recruitComplete', {
              onListClick: () => {
                router.push('/project');
              },
              onDetailClick: () => {
                router.push(`/project/${response.postId}`);
              },
            });
          },
          onError: (error) => {
            console.error('프로젝트 생성 실패:', error);
          },
        });
      }
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  // 폼 제출 실패 시 콜백
  const onError = (errors: unknown) => {
    console.error('폼 유효성 검사 실패:', errors);
  };

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
        <TitleInput control={control} name={'title'} />
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
