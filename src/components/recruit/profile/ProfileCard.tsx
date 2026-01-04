'use client';

import Image from 'next/image';
import ProfileTag from '@/components/profile/ProfileTag';
import ProfileLinkButton from '@/components/profile/ProfileLinkButton';
import { ResponseProfile } from '@/types/profile';
import { useModal } from '@/contexts/ModalContext';

interface ProfileCardProps {
  profile: ResponseProfile;
  isSelected?: boolean;
  onClick?: () => void;
}

const ProfileCard = ({ profile, isSelected = false, onClick }: ProfileCardProps) => {
  const { openModal } = useModal();

  const handleOpenDetailModal = () => {
    openModal('profileDetail', { profile });
  };

  return (
    <>
      {/* desktop */}
      <section className="desktop:block hidden">
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
      {/* mobile */}
      <section className="desktop:hidden block" onClick={onClick}>
        <div className="flex gap-2">
          <Image
            src={isSelected ? '/icons/radio-selected.svg' : '/icons/radio-unselected.svg'}
            alt={isSelected ? 'selected' : 'unselected'}
            width={28}
            height={28}
            className="h-6 w-6"
          />
          <p className="body-7 pb-3 text-gray-800">{profile.profileName || '새 프로필'}</p>
        </div>
        <div
          className={`bg-gray-0 flex w-full flex-col rounded-2xl transition-all ${
            isSelected ? 'border-primary-900 border' : 'border border-gray-300'
          }`}
        >
          <div className="flex flex-col items-start gap-1.5 px-5 py-4">
            <div className="flex items-center gap-1">
              <Image
                src={profile.profileImageUrl || '/icons/profile.svg'}
                alt="profile"
                width={100}
                height={100}
                className="h-8 w-8 rounded-full object-cover"
              />
              <p className="body-7">{profile.userName}</p>
            </div>
            {/* 태그 */}
            <div className="flex gap-2">
              {profile.headKeywords?.map((keyword) => (
                <ProfileTag key={keyword}>{keyword}</ProfileTag>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-gray-300" />
          <button
            className="body-7 py-3 text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpenDetailModal();
            }}
          >
            상세보기
          </button>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
