import React from 'react';
import ProfileTag from './ProfileTag';
import ProfileLinkButton from './ProfileLinkButton';
import Image from 'next/image';
import { useGetProfile } from '@/hooks/queries/useProfile';
import { useModal } from '@/contexts/ModalContext';

const Profile1 = ({ profileId }: { profileId: number }) => {
  const { openModal } = useModal();
  const { data } = useGetProfile({ profileId });
  if (!data) return null;

  const handleOpenDetailModal = () => {
    openModal('profileDetail', { profile: data });
  };

  return (
    <>
      {/* PC */}
      <div className="desktop:flex hidden justify-between rounded-2xl border border-gray-400 px-14 py-8">
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
                <p className="body-6 max-w-[300px] truncate text-gray-700">
                  {data.contactWay || '연락수단을 등록하지 않았어요'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700"></div>
                <p className="body-6 text-gray-700">
                  {data.workingTime
                    ? `${data.workingTime}에 작업하는 게 편해요`
                    : '작업시간대를 등록하지 않았어요'}
                </p>
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
          <button
            className="body-5 text-gray-0 bg-primary-900 cursor-pointer rounded-lg px-6 py-3"
            onClick={() => window.open(`/teampsylog/${data.uuid}`, '_blank')}
          >
            전체 키워드 보기
          </button>
        </div>
      </div>
      {/* mobile */}
      <div className="desktop:hidden bg-gray-0 flex flex-col justify-between rounded-2xl border border-gray-300">
        <div className="flex flex-col gap-1.5 px-5 py-4">
          <p className="flex items-center gap-1">
            <Image
              src={data.profileImageUrl || '/icons/profile.svg'}
              alt="profile"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="body-7 text-gray-900">{data.userName}님</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {data.headKeywords.map((keyword, index) => (
              <ProfileTag key={index}>{keyword}</ProfileTag>
            ))}
          </div>
        </div>
        <div className="body-7 flex border-t border-gray-300 text-gray-800">
          <button className="flex-1 py-3" onClick={handleOpenDetailModal}>
            상세보기
          </button>
          <div className="w-[1px] bg-gray-300"></div>
          <button
            className="flex-1 py-3"
            onClick={() => window.open(`/teampsylog/${data.uuid}`, '_blank')}
          >
            전체 키워드 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile1;
