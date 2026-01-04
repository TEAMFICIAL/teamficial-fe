import React from 'react';
import Image from 'next/image';
import { ResponseProfile } from '@/types/profile';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';

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
                      className="body-6 text-primary-900 max-w-[300px] truncate underline"
                      title={profile.contactWay}
                    >
                      {profile.contactWay}
                    </a>
                  ) : (
                    <p
                      className="body-6 max-w-[300px] truncate text-gray-700"
                      title={profile.contactWay}
                    >
                      {profile.contactWay || '연락수단을 등록하지 않았어요'}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="body-5 text-gray-800">작업시간</p>
                  <div className="h-3 w-[1px] bg-gray-700" />
                  <p className="body-6 text-gray-700">
                    {profile.workingTime
                      ? `${profile.workingTime}에 작업하는 게 편해요`
                      : '작업시간대를 선택해주세요'}
                  </p>
                </div>
              </div>
            </div>
            {/* 태그 */}
            <div className="flex gap-2">
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
            <div className="flex min-w-0 items-center gap-2">
              <p className="body-10 flex-shrink-0 text-gray-600">연락수단</p>
              {isUrl ? (
                <a
                  href={profile.contactWay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-10 text-primary-900 max-w-[300px] truncate underline"
                  title={profile.contactWay}
                >
                  {profile.contactWay}
                </a>
              ) : (
                <p
                  className="body-10 max-w-[300px] truncate text-gray-700"
                  title={profile.contactWay}
                >
                  {profile.contactWay || '연락수단을 등록하지 않았어요'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="body-10 text-gray-600">작업시간</p>
              <p className="body-10 text-gray-700">
                {profile.workingTime
                  ? `${profile.workingTime}에 작업하는 게 편해요`
                  : '작업시간대를 선택해주세요'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
