'use client';

import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import { useCreateProfile } from '@/hooks/mutation/useCreateProfile';

const ProfileList = () => {
  const { data: profiles } = useGetProfileList();
  const { mutate: createProfile } = useCreateProfile();
  const hasProfiles = profiles && profiles.length > 0;

  const handleAddProfile = () => {
    if ((profiles?.length ?? 0) >= 3) return;

    createProfile({
      profileName: null,
      workingTime: null,
      links: [''],
      contactWay: null,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center pb-14">
      <div className="flex w-full flex-col gap-4">
        {hasProfiles ? (
          profiles.map((profile) => <ProfileCard key={profile.profileId} profile={profile} />)
        ) : (
          <p className="text-gray-500">아직 등록된 프로필이 없습니다.</p>
        )}
      </div>
      {(!hasProfiles || profiles.length < 3) && (
        <Image
          src="/icons/profile-add.svg"
          onClick={handleAddProfile}
          alt="add"
          width={24}
          height={24}
          className="mt-4 cursor-pointer"
        />
      )}
    </main>
  );
};

export default ProfileList;
