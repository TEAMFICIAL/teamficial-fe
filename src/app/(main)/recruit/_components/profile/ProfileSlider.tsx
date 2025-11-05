'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { useGetProfileList } from '@/hooks/queries/useProfile';
import { Control, Controller } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';

interface Props {
  control: Control<RecruitFormType>;
  name?: 'profileId';
}

const ProfileSlider = ({ control, name = 'profileId' }: Props) => {
  const [index, setIndex] = useState(0);
  const { data: profiles } = useGetProfileList();

  if (!profiles) return null;

  const currentProfile = profiles[index];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={profiles[0]?.profileId}
      render={({ field: { onChange } }) => (
        <>
          <p className="title-3">작성자 프로필 선택하기</p>
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-300 px-5 py-8">
            {index > 0 ? (
              <button
                onClick={() => {
                  setIndex(index - 1);
                  onChange(profiles[index - 1].profileId);
                }}
                className="cursor-pointer"
                aria-label="prev"
              >
                <Image
                  src={`/icons/profile_arrow_left.svg`}
                  alt="arrow_left"
                  width={32}
                  height={32}
                />
              </button>
            ) : (
              <button disabled className="pointer-events-none" aria-label="disabled_prev">
                <Image
                  src={`/icons/disabled_arrow_left.svg`}
                  alt="disabled_arrow_left"
                  width={32}
                  height={32}
                />
              </button>
            )}
            <ProfileCard profile={currentProfile} />
            {index < profiles.length - 1 ? (
              <button
                onClick={() => {
                  setIndex(index + 1);
                  onChange(profiles[index + 1].profileId);
                }}
                className="cursor-pointer"
                aria-label="next"
              >
                <Image
                  src={`/icons/profile_arrow_right.svg`}
                  alt="arrow_right"
                  width={32}
                  height={32}
                />
              </button>
            ) : (
              <button disabled className="pointer-events-none" aria-label="disabled_next">
                <Image
                  src={`/icons/disabled_arrow_right.svg`}
                  alt="disabled_arrow_right"
                  width={32}
                  height={32}
                />
              </button>
            )}
          </div>
        </>
      )}
    />
  );
};

export default ProfileSlider;
