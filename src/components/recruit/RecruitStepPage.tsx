'use client';

import React, { useState, useEffect, useRef } from 'react';
import { isLoggedIn } from '@/utils/auth';
import { useUserStore } from '@/store/useUserStore';
import RecruitForm from '@/components/recruit/RecruitForm';
import Button from '@/components/common/Button';
import { FormProvider, useForm } from 'react-hook-form';
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
import Image from 'next/image';
import MobileHeader from '../common/MobileHeader';
import { useRecruitNavigationGuard } from '@/hooks/useRecruitNavigationGuard';
import { usePreventNavigation } from '@/hooks/usePreventNavigation';

type Step = 'form' | 'profile';

const RecruitPage = () => {
  const { userName, _hasHydrated } = useUserStore();
  const router = useRouter();

  const redirectedRef = useRef(false);
  useEffect(() => {
    if (!_hasHydrated || redirectedRef.current) return;
    if (!isLoggedIn(userName)) {
      redirectedRef.current = true;
      alert('로그인이 필요합니다.');
      setTimeout(() => router.push('/login'), 0);
    }
  }, [_hasHydrated, userName, router]);

  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Partial<RecruitFormType> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal } = useModal();
  const { mutate: createProject } = useCreateProject();

  const methods = useForm<ProfileSelectType>({
    mode: 'onChange',
    resolver: zodResolver(profileSelectSchema),
  });
  const profileControl = methods.control;
  const handleProfileSubmit = methods.handleSubmit;
  const selectedProfileId = methods.watch('profileId');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useRecruitNavigationGuard(!isSubmitting, setIsSubmitting);

  usePreventNavigation(!isSubmitting, (navigate) => {
    openModal('notFinish', {
      onConfirm: () => {
        setIsSubmitting(true);
        navigate();
      },
    });
  });

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

    setIsSubmitting(true);

    createProject(finalData, {
      onSuccess: (response) => {
        openModal('recruitComplete', {
          onListClick: () => router.push('/project'),
          onDetailClick: () => router.push(`/project/${response.postId}`),
        });
      },
      onError: (error) => {
        console.error('프로젝트 생성 실패:', error);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      {step === 'form' ? (
        <MobileHeader title="팀원 모집하기" progress={0.5} />
      ) : (
        <MobileHeader title="팀원 모집하기" progress={1} />
      )}
      <div className="desktop:bg-gray-0 -mx-4 min-h-[calc(100vh-7rem)] bg-gray-100 px-4">
        <div className="flex items-center justify-between pt-7 pb-5">
          <div className="flex flex-col">
            <p className="desktop:title-2 title-4 text-gray-900">
              {step === 'form' ? '팀원 모집하기' : '작성자 프로필 선택하기'}
            </p>
            <p className="desktop:body-6 body-10 text-gray-700">
              {step === 'form'
                ? '게시글을 작성하여 원하는 분야의 팀원을 모집해보세요'
                : '공개할 프로필을 한 가지 선택해주세요'}
            </p>
          </div>
          <Image
            src={step === 'form' ? '/icons/first.svg' : '/icons/second.svg'}
            alt=""
            width={96}
            height={40}
            className="desktop:block hidden"
          />
        </div>
        {step === 'form' ? (
          <RecruitForm
            mode="create"
            onNext={handleNext}
            showProfileList={false}
            initialFormData={formData}
          />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="flex flex-col">
              <ProfileSelect control={profileControl} />
              <div className="tablet:flex my-14 hidden justify-end gap-3">
                <Button variant="gray" type="button" label="이전으로" onClick={handleBack} />
                <Button type="submit" label="업로드하기" disabled={!selectedProfileId} />
              </div>
              <div className="tablet:hidden bg-gray-0 fixed bottom-0 left-0 flex w-full justify-end gap-2 border-t border-gray-300 px-4 py-5">
                <Button
                  variant="gray"
                  type="button"
                  label="이전으로"
                  onClick={handleBack}
                  className="w-full"
                />
                <Button
                  type="submit"
                  label="업로드하기"
                  disabled={!selectedProfileId}
                  className="w-full"
                />
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
};

export default RecruitPage;
