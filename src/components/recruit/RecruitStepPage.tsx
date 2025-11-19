'use client';

import React, { useState, useEffect } from 'react';
import RecruitForm from '@/components/recruit/RecruitForm';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RecruitFormType,
  profileSelectSchema,
  ProfileSelectType,
} from '@/libs/schemas/projectSchema';
import { useCreateProject } from '@/hooks/mutation/useCreateProject';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import { CreateProject } from '@/types/project';
import ProfileSelect from './ProfileSelect';

type Step = 'form' | 'profile';

const RecruitPage = () => {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Partial<RecruitFormType> | null>(null);
  const router = useRouter();
  const { openModal } = useModal();
  const { mutate: createProject } = useCreateProject();

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    watch,
  } = useForm<ProfileSelectType>({
    mode: 'onChange',
    resolver: zodResolver(profileSelectSchema),
  });

  const selectedProfileId = watch('profileId');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = (data: Partial<RecruitFormType>) => {
    setFormData(data);
    setStep('profile');
  };

  const handleBack = () => {
    setStep('form');
  };

  const onProfileSubmit = (profileData: ProfileSelectType) => {
    if (!formData) return;

    const finalData: CreateProject = {
      ...formData,
      profileId: profileData.profileId,
      status: 'OPEN',
    } as CreateProject;

    createProject(finalData, {
      onSuccess: (response) => {
        openModal('recruitComplete', {
          onListClick: () => router.push('/project'),
          onDetailClick: () => router.push(`/project/${response.postId}`),
        });
      },
      onError: (error) => {
        console.error('프로젝트 생성 실패:', error);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col pt-7 pb-5">
        <p className="title-2 text-gray-900">
          {step === 'form' ? '팀원 모집하기' : '작성자 프로필 선택하기'}
        </p>
        <p className="body-6 text-gray-700">
          {step === 'form'
            ? '게시글을 작성하여 원하는 분야의 팀원을 모집해보세요'
            : '공개할 프로필을 한 가지 선택해주세요'}
        </p>
      </div>

      {step === 'form' ? (
        <RecruitForm
          mode="create"
          onNext={handleNext}
          showProfileList={false}
          initialFormData={formData}
        />
      ) : (
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="flex flex-col gap-4">
          <ProfileSelect control={profileControl} />

          <div className="mt-6 mb-10 flex justify-end gap-3">
            <Button variant="gray" type="button" label="이전으로" onClick={handleBack} />
            <Button type="submit" label="업로드하기" disabled={!selectedProfileId} />
          </div>
        </form>
      )}
    </>
  );
};

export default RecruitPage;
