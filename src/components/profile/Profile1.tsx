import React from 'react';
import Button from '../common/Button';
import ProfileTag from './ProfileTag';
import ProfileLinkButton from './ProfileLinkButton';
import Image from 'next/image';
import { useGetProfile } from '@/hooks/queries/useProfile';

const Profile1 = ({ profileId }: { profileId: number }) => {
  const { data } = useGetProfile({ profileId });
  if (!data) return null;

  return (
    <div className="flex justify-between rounded-2xl border border-gray-400 px-14 py-8">
      <div className="flex items-start gap-7">
        {/* 프로필 사진 */}
        <Image
          src={data.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-5">
          {/* 이름 및 정보 */}
          <div className="flex flex-col">
            <p className="body-1 mb-2">{data.userName}</p>
            <div className="flex items-center gap-2">
              <p className="body-5 text-gray-800">연락 수단</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              {/* TODO: 팀원이 되면 공개해요 처리 */}
              <p className="body-6 text-gray-700">{data.contactWay}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="body-5 text-gray-800">작업시간</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-700">{data.workingTime}에 작업하는 게 편해요</p>
            </div>
          </div>
          {/* 태그 */}
          {/* TODO: 프로필 키워드 적용 */}
          <div className="flex gap-2">
            <ProfileTag>피드백장인</ProfileTag>
            <ProfileTag>시간잘지킴</ProfileTag>
            <ProfileTag>꼼꼼한</ProfileTag>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {/* 연락 수단 아이콘*/}
        <div className="flex gap-4 self-end">
          {data.links &&
            data.links.length > 0 &&
            data.links.map((link, index) => <ProfileLinkButton key={index} link={link} />)}
        </div>
        <Button label="전체 키워드보기" />
      </div>
    </div>
  );
};

export default Profile1;
