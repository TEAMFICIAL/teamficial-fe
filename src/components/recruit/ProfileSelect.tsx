import { useGetProfileList } from '@/hooks/queries/useProfile';
import { ProfileSelectType } from '@/libs/schemas/projectSchema';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import ProfileCard from './profile/ProfileCard';

type Props = {
  control: Control<ProfileSelectType>;
};

const ProfileSelect = ({ control }: Props) => {
  const { data: profiles } = useGetProfileList();

  return (
    <Controller
      name="profileId"
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-4">
          {profiles &&
            profiles.map((profile) => (
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
