'use client';

import { ProfileDetailModalProps } from '@/constants/ModalList';

import Image from 'next/image';
import BaseModal from '..';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { cn } from '@/utils/cn';

const ProfileDetailModal = ({ isOpen, onClose, profile }: ProfileDetailModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 pb-4">
          <div className="flex flex-col gap-1.5">
            <div className="body-7 flex items-center gap-1">
              <Image
                src={profile.profileImageUrl || '/icons/profile.svg'}
                alt="profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <p>{profile.userName}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {profile.headKeywords.map((keyword, index) => (
                <ProfileTag key={index}>{keyword}</ProfileTag>
              ))}
            </div>
          </div>
          <div
            className={cn(
              'flex flex-col rounded-lg bg-gray-100 px-6 pt-3 pb-5',
              profile.links && profile.links.length > 0 && 'gap-[21px]',
            )}
          >
            <div className="body-10 flex flex-col gap-1 text-gray-700">
              <div className="flex gap-2">
                <p className="text-gray-600">연락수단</p>
                <p>{profile.contactWay || '연락수단을 등록하지 않았어요'}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-600">작업시간</p>
                <p>
                  {profile.workingTime
                    ? `${profile.workingTime}에 작업하는 게 편해요`
                    : '작업시간대를 등록하지 않았어요'}
                </p>
              </div>
            </div>
            <div className="flex gap-6 self-center">
              {profile.links &&
                profile.links.length > 0 &&
                profile.links.map((link, index) => <ProfileLinkButton key={index} link={link} />)}
            </div>
          </div>
        </div>
        <div className="mx-[-16px] h-[1px] bg-gray-300" />
        <div className="body-7 mx-[-16px] mb-[-8px] flex pt-3 text-gray-800">
          <button className="flex-1" onClick={onClose}>
            닫기
          </button>
          <div className="my-[-12px] w-[1px] bg-gray-300" />
          <button
            className="flex-1"
            onClick={() => window.open(`/teampsylog/${profile.uuid}`, '_blank')}
          >
            전체 키워드 보기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ProfileDetailModal;
