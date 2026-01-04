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
import PartDropdown from './PartDropdown';

const ApplyModal = ({ isOpen, onClose, postId, recruitingPositions }: ApplyModalProps) => {
  const { mutate: applicateProject } = useApplicateProject();
  const positions = recruitingPositions?.map((pos) => pos.position) || [];

  const { openModal } = useModal();

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(null);
  const [message, setMessage] = useState('');

  const handleProfileSelect = (profileId: number) => {
    setSelectedProfileId(profileId);
  };

  const handleSubmit = () => {
    if (!postId || !selectedProfileId || !selectedPosition) return;
    if (message.length > 250) return;

    const applicationData = {
      recruitingPostId: postId,
      profileId: selectedProfileId,
      position: selectedPosition,
      content: message,
    };

    applicateProject(applicationData, {
      onSuccess: () => {
        onClose();
        openModal('applyComplete');
      },
      onError: (error) => {
        console.error('Failed to apply for project:', error);
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} paddingClass="tablet:p-6">
      <div className="flex flex-col gap-10">
        <div>
          <p className="body-5 flex">
            <span className="text-gray-800">해당 프로젝트를 지원할까요?</span>
            <span className="text-red-100"> *</span>
          </p>
          <p className="body-8 mb-4 text-gray-700">
            마이페이지에서 설정한 프로필 중 한 가지를 선택해주세요
          </p>
          <ProfileSlider onProfileSelect={handleProfileSelect} />
          <PartDropdown onPositionSelect={setSelectedPosition} positions={positions} />
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
              className={`body-5 px-8 py-4 ${
                message.length > 250 || selectedPosition === null
                  ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                  : 'bg-primary-900 text-gray-0 hover:bg-primary-700'
              } `}
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
