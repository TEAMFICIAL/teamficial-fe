'use client';

import { useParams } from 'next/navigation';
import ProfileTitle from '../../_components/ProfileTitle';
import ProfileEditContainer from './_components/ProfileEditContainer';
import ProfileImage from './_components/ProfileImage';
import { useGetProfile } from '@/hooks/queries/useProfile';
import MobileHeader from '@/components/common/MobileHeader';

const Page = () => {
  const { id } = useParams();
  const profileId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const { data: profile } = useGetProfile({ profileId });
  if (isNaN(profileId)) {
    return <p className="text-red-500">유효하지 않은 프로필 ID입니다.</p>;
  }
  if (!profile) {
    return <p className="text-gray-500">프로필 정보를 불러오는 중...</p>;
  }

  return (
    <>
      <MobileHeader title="프로필 편집" />
      <div className="tablet:bg-transparent -mx-4 h-full bg-gray-100">
        <ProfileTitle />
        <ProfileImage profile={profile} />
        <ProfileEditContainer profile={profile} />
      </div>
    </>
  );
};

export default Page;
