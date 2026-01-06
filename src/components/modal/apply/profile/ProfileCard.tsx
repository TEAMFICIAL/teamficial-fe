import React from 'react';
import Image from 'next/image';
import { ResponseProfile } from '@/types/profile';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { ContactInfo, WorkingTimeInfo } from './ContactInfo';

interface ProfileCardProps {
  profile: ResponseProfile;
  isSelected?: boolean;
}

const ProfileCard = ({ profile, isSelected }: ProfileCardProps) => {
  const isUrl = /^(https?:\/\/|www\.)/i.test(profile.contactWay);

  return (
    <>
      {/* desktop */}
      <div
        className={`desktop:flex hidden w-full cursor-pointer ${profile.links && profile.links.length > 0 ? 'justify-between' : 'flex-1 justify-start'}`}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
      >
        <div className="flex justify-between gap-4">
          <Image
            src={profile.profileImageUrl || '/icons/profile.svg'}
            className="h-[64px] w-[64px] flex-shrink-0 rounded-full object-cover"
            alt="profile"
            width={64}
            height={64}
          />
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="body-1">{profile.userName}</p>

              <div className="flex flex-col gap-1">
                <ContactInfo contactWay={profile.contactWay} isUrl={isUrl} textSize="body-8" />
                <WorkingTimeInfo workingTime={profile.workingTime} textSize="body-8" />
              </div>
            </div>
            {/* 태그 */}
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {profile.headKeywords?.map((keyword) => (
                <ProfileTag key={keyword}>{keyword}</ProfileTag>
              ))}
            </div>
          </div>
        </div>
        {/* 연락 수단 아이콘 */}
        <div className="flex gap-4">
          {profile.links &&
            profile.links.length > 0 &&
            profile.links.map((link, index) => <ProfileLinkButton key={index} link={link} />)}
        </div>
      </div>
      {/* mobile */}
      <div
        className={`desktop:hidden flex flex-col gap-2 border-t-[1px] border-gray-300 pt-3 ${profile.links && profile.links.length > 0 ? 'justify-between' : 'flex-1 justify-start'}`}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Image
              src={profile.profileImageUrl || '/icons/profile.svg'}
              className="h-8 w-8 rounded-full object-cover"
              alt="profile"
              width={40}
              height={40}
            />
            <p className="body-7">{profile.userName}</p>
          </div>
          <div className="flex gap-1">
            {profile.headKeywords?.map((keyword) => (
              <ProfileTag key={keyword}>{keyword}</ProfileTag>
            ))}
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 pt-3 pr-5 pb-5 pl-6">
          <div className="flex flex-col gap-1">
            <ContactInfo contactWay={profile.contactWay} isUrl={isUrl} textSize="body-9" />
            <WorkingTimeInfo workingTime={profile.workingTime} textSize="body-9" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
