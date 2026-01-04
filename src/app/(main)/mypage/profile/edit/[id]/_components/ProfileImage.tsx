'use client';

import Button from '@/components/common/button/Button';
import { useUploadProfileImage } from '@/hooks/mutation/useUploadProfileImage';
import { useDeleteProfileImage } from '@/hooks/mutation/useDeleteProfileImage';
import { useUserStore } from '@/store/useUserStore';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageProps {
  profile: ResponseProfile;
}

const ProfileImage = ({ profile }: ProfileImageProps) => {
  const { userName } = useUserStore();
  const { mutate: uploadProfileImage } = useUploadProfileImage();
  const { mutate: deleteProfileImage } = useDeleteProfileImage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !profile) return;

      uploadProfileImage(
        { profileId: profile.profileId, file },
        {
          onSuccess: () => {
            console.log('이미지 업로드 성공');
            setIsModalOpen(false);
          },
          onError: (error) => {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          },
        },
      );
    };

    input.click();
  };

  const handleUpload = () => {
    setIsModalOpen(false);
    handleImageChange();
  };

  const handleDelete = () => {
    if (!profile) return;

    deleteProfileImage(profile.profileId, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error('이미지 삭제 실패:', error);
        alert('이미지 삭제에 실패했습니다.');
      },
    });
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="tablet:hidden flex items-center justify-center pt-7 pb-6">
        <div className="relative">
          <Image
            src={profile.profileImageUrl || '/icons/profile.svg'}
            className="h-22 w-22 rounded-full object-cover"
            alt="profile"
            width={90}
            height={90}
          />
          <button
            onClick={handleModalToggle}
            className="absolute right-0 bottom-0 cursor-pointer"
            aria-label="프로필 이미지 변경"
          >
            <Image
              src="/icons/profile-image-add.svg"
              alt="프로필 이미지 추가"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/50" onClick={handleModalToggle} />
          <div className="fixed bottom-0 left-0 z-[100] flex w-full flex-col rounded-t-2xl bg-white py-4">
            <button className="body-7 w-full bg-gray-50 pb-5 text-gray-800" onClick={handleUpload}>
              업로드하기
            </button>
            <div className="h-[1px] bg-gray-300" />
            <button className="body-7 w-full bg-gray-50 pt-5 text-red-100" onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        </>
      )}
      <div className="tablet:flex mx-0 mb-5 flex hidden justify-between rounded-lg bg-gray-100 py-7 pr-10 pl-8">
        <div className="tablet:flex hidden items-center gap-4">
          <Image
            src={profile.profileImageUrl || '/icons/profile.svg'}
            className="h-25 w-25 self-start rounded-full object-cover"
            alt="profile"
            width={100}
            height={100}
          />
          <p className="title-2 text-gray-900">{userName}님</p>
        </div>
        <div className="tablet:flex hidden items-center justify-center">
          <Button
            onClick={handleImageChange}
            className="bg-primary-900 text-gray-0 body-3 flex items-center justify-center px-6 py-3"
          >
            프로필 사진 변경하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
