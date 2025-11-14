'use client';

import Image from 'next/image';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { ResponseProfile } from '@/types/profile';
import Button from '@/components/common/button/Button';

interface ProfileCardProps {
  profile: ResponseProfile;
  keywords?: string[];
}

const ProfileCard = ({ profile, keywords }: ProfileCardProps) => {
  return (
    <div className="mx-8 flex w-full justify-between">
      <div className="flex items-start gap-7">
        <Image
          src={profile.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {/* 이름 및 정보 */}
            <div className="flex flex-col">
              <p className="body-1 mb-2">{profile.userName}</p>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">연락 수단</p>
                <div className="h-3 w-[1px] bg-gray-700"></div>
                {/* TODO: 팀원이 되면 공개해요 처리 */}
                <p className="body-6 text-gray-700">{profile.contactWay}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700"></div>
                <p className="body-6 text-gray-700">{profile.workingTime}에 작업하는 게 편해요</p>
              </div>
            </div>
          </div>
          {/* 태그 */}
          {/* TODO: 태그 추후 적용 시 처리 */}
          <div className="flex gap-2">
            {keywords?.map((keyword) => (
              <ProfileTag key={keyword}>{keyword}</ProfileTag>
            ))}
            <ProfileTag>굿</ProfileTag>
            <ProfileTag>피드백</ProfileTag>
            <ProfileTag>태그</ProfileTag>
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
        <Button disabled className="bg-gray-300 px-4 py-2 text-gray-600">
          전체 키워드 보기
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
