'use client';

import Image from 'next/image';
import Button from '@/components/common/button/Button';
import DropdownSelect from './Dropdown';
import { ResponseProfile } from '@/types/profile';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { POSITION_KR } from '@/constants/Translate';
import { PositionType } from '@/utils/position';

interface ProfileCardProps {
  profile: ResponseProfile;
  keywords?: string[];
  positions: PositionType[];
  onPositionSelect?: (position: PositionType | null) => void;
}

const ProfileCard = ({ profile, keywords, positions, onPositionSelect }: ProfileCardProps) => {
  const positionOptions = positions.map((position) => ({
    value: position,
    label: POSITION_KR[position],
  }));

  const handleSelect = (selectedValue: string | null) => {
    onPositionSelect?.(selectedValue ? (selectedValue as PositionType) : null);
  };

  return (
    <div className="flex gap-8">
      <div className="flex items-start gap-4">
        <Image
          src={profile.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="body-1">{profile.userName}</p>
              <DropdownSelect
                options={positionOptions}
                defaultLabel="지원분야"
                onSelect={handleSelect}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">연락 수단</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">{profile.contactWay}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700" />
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
