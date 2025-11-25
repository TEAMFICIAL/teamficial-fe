'use client';

import Image from 'next/image';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { ResponseProfile } from '@/types/profile';

interface ProfileCardProps {
  profile: ResponseProfile;
  isSelected?: boolean;
  onClick?: () => void;
}

const ProfileCard = ({ profile, isSelected = false, onClick }: ProfileCardProps) => {
  return (
    <section>
      <p className="body-3 pb-3 text-gray-700">{profile.profileName || '새 프로필'}</p>
      <div
        className={`flex w-full cursor-pointer justify-between rounded-2xl px-14 py-8 transition-all ${
          isSelected
            ? 'border-primary-900 bg-primary-50 border-2'
            : 'border border-gray-300 hover:border-gray-400'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start gap-7">
          <Image
            src={profile.profileImageUrl || '/icons/profile.svg'}
            alt="profile"
            width={100}
            height={100}
            className="h-25 w-25 rounded-full object-cover"
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              {/* 이름 및 정보 */}
              <div className="flex flex-col">
                <p className="body-1 mb-2">{profile.userName}</p>
                <div className="flex items-center gap-2">
                  <p className="body-5 text-gray-800">연락수단</p>
                  <div className="h-3 w-[1px] bg-gray-700"></div>
                  <p className="body-6 text-gray-700">
                    {profile.contactWay || '연락수단을 등록하지 않았어요'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="body-5 text-gray-800">작업시간</p>
                  <div className="h-3 w-[1px] bg-gray-700"></div>
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

        <div className="flex flex-col justify-between">
          {/* 연락 수단 아이콘*/}
          <div className="flex gap-4 self-end">
            {profile.links &&
              profile.links.length > 0 &&
              profile.links.map((link, index) => <ProfileLinkButton key={index} link={link} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
