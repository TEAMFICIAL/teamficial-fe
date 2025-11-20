import React from 'react';
import Image from 'next/image';
import { ResponseProfile } from '@/types/profile';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';

interface ProfileCardProps {
  profile: ResponseProfile;
  keywords?: string[];
  isSelected?: boolean;
}

const ProfileCard = ({ profile, keywords, isSelected }: ProfileCardProps) => {
  const isUrl = /^(https?:\/\/|www\.)/i.test(profile.contactWay);

  return (
    <div
      className={`flex w-full cursor-pointer ${profile.links && profile.links.length > 0 ? 'justify-between' : 'flex-1 justify-start'}`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="flex justify-between gap-4">
        <Image
          src={profile.profileImageUrl || '/icons/profile.svg'}
          className="h-[90px] w-[90px] rounded-full object-cover"
          alt="profile"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="body-1">{profile.userName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex min-w-0 items-center gap-2">
                <p className="body-5 flex-shrink-0 text-gray-800">연락수단</p>
                <div className="h-3 w-[1px] bg-gray-700"></div>
                {isUrl ? (
                  <a
                    href={profile.contactWay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-4 text-primary-900 max-w-[180px] truncate underline"
                    title={profile.contactWay}
                  >
                    {profile.contactWay}
                  </a>
                ) : (
                  <p
                    className="body-4 max-w-[180px] truncate text-gray-700"
                    title={profile.contactWay}
                  >
                    {profile.contactWay}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">{profile.workingTime}에 작업하는 게 편해요</p>
              </div>
            </div>
          </div>
          {/* 태그 */}
          <div className="flex gap-2">
            {keywords?.map((keyword) => (
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
  );
};

export default ProfileCard;
