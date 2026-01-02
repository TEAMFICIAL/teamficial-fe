import { useGetProfileList } from '@/hooks/queries/useProfile';
import { ProfileSelectType } from '@/libs/schemas/projectSchema';
import React from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';
import ProfileCard from './profile/ProfileCard';
import Link from 'next/link';

type Props = {
  control: Control<ProfileSelectType>;
};

const ProfileSelect = ({ control }: Props) => {
  const { data: profiles } = useGetProfileList();
  // 키워드 존재 프로필만 필터링
  const filteredProfiles = profiles?.filter(
    (profile) => profile.headKeywords && profile.headKeywords.length > 0,
  );

  // useFormContext로 setValue, watch 사용
  const { setValue, watch } = useFormContext<ProfileSelectType>();
  const profileId = watch('profileId');

  React.useEffect(() => {
    if (
      filteredProfiles &&
      filteredProfiles.length > 0 &&
      (profileId === undefined || profileId === null || profileId === 0)
    ) {
      setValue('profileId', filteredProfiles[0].profileId);
    }
  }, [filteredProfiles, profileId, setValue]);

  if (!filteredProfiles || filteredProfiles.length === 0) {
    return (
      <div className="flex h-53 w-full items-center justify-center rounded-2xl border border-gray-300 px-5 py-12">
        <p className="body-4 text-gray-600">
          대표키워드가 설정된 프로필이 없습니다.
          <Link
            href="/teampsylog"
            className="text-primary-900 mx-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            팀피셜록
          </Link>
          에서 대표키워드를 설정해주세요.
        </p>
      </div>
    );
  }

  return (
    <Controller
      name="profileId"
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-4">
          {filteredProfiles &&
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.profileId}
                profile={profile}
                isSelected={value === profile.profileId}
                onClick={() => onChange(profile.profileId)}
              />
            ))}
        </div>
      )}
    />
  );
};

export default ProfileSelect;
