'use client';

import Button from '@/components/common/button/Button';
import BaseModal from '../index';
import MessageTextarea from './MessageTextarea';
import ProfileSlider from './profile/ProfileSlider';
import { useModal } from '@/contexts/ModalContext';
import { useState } from 'react';
import { ApplyModalProps } from '@/constants/ModalList';
import { useApplicateProject } from '@/hooks/mutation/useApplicateProject';
import { PositionType } from '@/utils/position';

const ApplyModal = ({ isOpen, onClose, postId, recruitingPositions }: ApplyModalProps) => {
  const { mutate: applicateProject } = useApplicateProject();
  const positions = recruitingPositions?.map((pos) => pos.position) || [];

  const { openModal } = useModal();

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(null);

  const handleProfileSelect = (profileId: number) => {
    setSelectedProfileId(profileId);
  };
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!postId || !selectedProfileId || !selectedPosition) return;
    if (message.length > 250) return;

    const applicationData = {
      recruitingPostId: postId,
      profileId: selectedProfileId,
      position: selectedPosition,
      content: message,
    };

    // 테스트용 콘솔 출력
    console.group('프로젝트 지원 데이터');
    console.log('프로젝트 ID:', applicationData.recruitingPostId);
    console.log('프로필 ID:', applicationData.profileId);
    console.log('지원 분야:', applicationData.position);
    console.log('지원 메시지:', applicationData.content);
    console.groupEnd();

    applicateProject(
      { ...applicationData },
      {
        onSuccess: () => {
          onClose();
          openModal('applyComplete');
        },
        onError: (error) => {
          console.error('Failed to apply for project:', error);
        },
      },
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-10">
        <div>
          <p className="title-3 flex">
            <span className="text-gray-800">해당 프로젝트를 지원할까요?</span>
            <span className="text-red-100"> *</span>
          </p>
          <p className="body-6 mb-4 text-gray-700">
            마이페이지에서 설정한 프로필 중 한 가지를 선택해주세요
          </p>
          <ProfileSlider
            onProfileSelect={handleProfileSelect}
            onPositionSelect={setSelectedPosition}
            positions={positions}
          />
        </div>
        <div>
          <MessageTextarea value={message} onChange={setMessage} />
          <div className="flex justify-end gap-2">
            <Button
              className="body-5 bg-gray-300 px-8 py-4 text-gray-800 disabled:cursor-not-allowed disabled:text-gray-600"
              onClick={onClose}
            >
              취소하기
            </Button>
            <Button
              className="body-5 bg-primary-900 text-gray-0 hover:bg-primary-700 px-8 py-4"
              onClick={handleSubmit}
              disabled={message.length > 250 || selectedPosition === null}
            >
              지원하기
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplyModal;
