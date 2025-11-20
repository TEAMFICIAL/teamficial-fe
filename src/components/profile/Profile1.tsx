import React from 'react';
import Button from '../common/Button';
import ProfileTag from './ProfileTag';
import ProfileLinkButton from './ProfileLinkButton';
import Image from 'next/image';
import { useGetProfile } from '@/hooks/queries/useProfile';

const Profile1 = ({ profileId }: { profileId: number }) => {
  const { data } = useGetProfile({ profileId });
  if (!data) return null;

  const isUrl = /^(https?:\/\/|www\.)/i.test(data.contactWay);

  return (
    <div className="flex justify-between rounded-2xl border border-gray-400 px-14 py-8">
      <div className="flex items-start gap-7">
        {/* 프로필 사진 */}
        <Image
          src={data.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={100}
          height={100}
          className="h-25 w-25 rounded-full object-cover"
        />
        <div className="flex flex-col gap-5">
          {/* 이름 및 정보 */}
          <div className="flex flex-col">
            <p className="body-1 mb-2">{data.userName}</p>
            <div className="flex min-w-0 items-center gap-2">
              <p className="body-5 flex-shrink-0 text-gray-800">연락수단</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              {/* TODO: 팀원이 되면 공개해요 처리 */}
              {isUrl ? (
                <a
                  href={data.contactWay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-4 text-primary-900 max-w-[420px] truncate underline"
                  title={data.contactWay}
                >
                  {data.contactWay}
                </a>
              ) : (
                <p className="body-4 max-w-[180px] truncate text-gray-700" title={data.contactWay}>
                  {data.contactWay}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="body-5 text-gray-800">작업시간</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-700">{data.workingTime}에 작업하는 게 편해요</p>
            </div>
          </div>
          {/* 태그 */}
          <div className="flex gap-2">
            {data.headKeywords.map((keyword, index) => (
              <ProfileTag key={index}>{keyword}</ProfileTag>
            ))}
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
