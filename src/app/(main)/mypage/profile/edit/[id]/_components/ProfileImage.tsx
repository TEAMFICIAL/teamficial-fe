'use client';

import Button from '@/components/common/button/Button';
import { useUploadProfileImage } from '@/hooks/mutation/useUploadProfileImage';
import { useUserStore } from '@/store/useUserStore';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';

interface ProfileImageProps {
  profile: ResponseProfile;
}

const ProfileImage = ({ profile }: ProfileImageProps) => {
  const { userName } = useUserStore();
  const { mutate: uploadProfileImage } = useUploadProfileImage();

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

  return (
    <div className="mb-5 flex justify-between rounded-lg bg-gray-100 py-7 pr-10 pl-8">
      <div className="flex items-center gap-4">
        <Image
          src={profile.profileImageUrl || '/icons/initial-profile.svg'}
          className="h-[100px] w-[100px] self-start rounded-full"
          alt="profile"
          width={100}
          height={100}
        />
        <p className="title-2 text-gray-900">{userName}님</p>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={handleImageChange}
          className="bg-primary-900 text-gray-0 body-3 flex items-center justify-center px-6 py-3"
        >
          프로필 사진 변경하기
        </Button>
      </div>
    </div>
  );
};

export default ProfileImage;
