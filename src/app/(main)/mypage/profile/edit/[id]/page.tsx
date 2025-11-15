'use client';

import { useParams } from 'next/navigation';
import ProfileTitle from '../../_components/ProfileTitle';
import ProfileEditContainer from './_components/ProfileEditContainer';
import ProfileImage from './_components/ProfileImage';
import { useGetProfile } from '@/hooks/queries/useProfile';

const Page = () => {
  const { id } = useParams();
  const profileId = Number(id);
  const { data: profile } = useGetProfile({ profileId });

  if (!profile) {
    return <p className="text-gray-500">프로필 정보를 불러오는 중...</p>;
  }

  return (
    <>
      <ProfileTitle />
      <ProfileImage profile={profile} />
      <ProfileEditContainer profile={profile} />
    </>
  );
};

export default Page;
