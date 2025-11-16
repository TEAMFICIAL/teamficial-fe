'use client';

import WorkTimeDropdown from './WorkingTimeDropdown';
import Button from '@/components/common/button/Button';
import LabeledTextarea from './LabeledTextarea';
import { useEffect, useState } from 'react';
import { ResponseProfile } from '@/types/profile';
import { useUpdateProfile } from '@/hooks/mutation/useUpdateProfile';
import { useModal } from '@/contexts/ModalContext';

interface ProfileEditContainerProps {
  profile: ResponseProfile;
}

const MAX_LINKS = 3;

const ProfileEditContainer = ({ profile }: ProfileEditContainerProps) => {
  const { openModal } = useModal();

  const [formData, setFormData] = useState({
    title: '',
    contact: '',
    workingTime: '',
    links: Array(MAX_LINKS).fill(''),
  });

  useEffect(() => {
    if (profile) {
      const links = [...(profile.links || [])];
      while (links.length < MAX_LINKS) links.push('');
      setFormData({
        title: profile.profileName || '',
        contact: profile.contactWay || '',
        workingTime: profile.workingTime || '',
        links,
      });
    }
  }, [profile]);

  const handleChange =
    (key: keyof typeof formData, index?: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (key === 'links' && typeof index === 'number') {
        const updatedLinks = [...formData.links];
        updatedLinks[index] = e.target.value;
        setFormData({ ...formData, links: updatedLinks });
      } else {
        setFormData({ ...formData, [key]: e.target.value });
      }
    };

  const { mutate: updateProfile } = useUpdateProfile();

  const handleSubmit = () => {
    const cleanedLinks =
      formData.links.length > 0
        ? formData.links.map((l) => (l.trim() === '' ? '' : l.trim()))
        : [''];

    const finalLinks = cleanedLinks.every((l) => l === '') ? [''] : cleanedLinks;

    updateProfile(
      {
        profileId: profile.profileId,
        profileName: formData.title.trim() === '' ? null : formData.title,
        workingTime: formData.workingTime.trim() === '' ? null : formData.workingTime,
        contactWay: formData.contact.trim() === '' ? null : formData.contact,
        links: finalLinks,
      },
      {
        onSuccess: () => {
          openModal('profileEditComplete');
        },
        onError: () => {
          alert('수정 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <>
      <LabeledTextarea
        id="title"
        label="프로필 제목 지정하기"
        placeholder="프로필 제목을 입력해주세요"
        value={formData.title}
        onChange={handleChange('title')}
        className="mb-6"
      />
      <LabeledTextarea
        id="contact"
        label="연락방법"
        placeholder="Ex. 카카오톡 오픈채팅 링크"
        value={formData.contact}
        onChange={handleChange('contact')}
        className="mb-6"
      />

      <div className="mb-6 flex flex-col gap-4">
        <p className="title-3 text-gray-900">작업시간</p>
        <WorkTimeDropdown
          value={formData.workingTime}
          onChange={(value) => setFormData({ ...formData, workingTime: value })}
        />
      </div>

      <div className="flex flex-col">
        <div>
          <p className="title-3 text-gray-900">나를 소개하는 링크 추가하기</p>
          <p className="body-4 text-gray-700">링크는 최대 3개까지 입력할 수 있어요</p>
        </div>
        {formData.links.map((link, idx) => (
          <LabeledTextarea
            key={idx}
            id={`link-${idx}`}
            label=""
            placeholder="링크를 입력해주세요"
            iconSrc="/icons/profile-link.svg"
            value={link}
            onChange={handleChange('links', idx)}
          />
        ))}
      </div>
      <div className="mb-14 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="body-3 bg-primary-900 text-gray-0 mt-[162px] px-8 py-4 disabled:bg-gray-300 disabled:text-gray-600"
        >
          저장하기
        </Button>
      </div>
    </>
  );
};

export default ProfileEditContainer;
