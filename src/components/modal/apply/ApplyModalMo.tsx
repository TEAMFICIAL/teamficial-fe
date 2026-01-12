'use client';

import Button from '@/components/common/button/Button';
import BaseModal from '../index';
import MessageTextarea from './MessageTextarea';
import { useModal } from '@/contexts/ModalContext';
import { useCallback, useEffect, useState } from 'react';
import { ApplyModalProps } from '@/constants/ModalList';
import { useApplicateProject } from '@/hooks/mutation/useApplicateProject';
import { PositionType } from '@/utils/position';
import PartDropdown from './PartDropdown';
import MoProfileSlider from './profile/MoProfileSlider';

type Step = 'profile' | 'detail';

const ApplyModalMo = ({ isOpen, onClose, postId, recruitingPositions }: ApplyModalProps) => {
  const { mutate: applicateProject } = useApplicateProject();
  const { openModal } = useModal();
  const positions = recruitingPositions?.map((pos) => pos.position) || [];

  const [step, setStep] = useState<Step>('profile');
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('profile');
      setSelectedProfileId(null);
      setSelectedPosition(null);
      setMessage('');
    }
  }, [isOpen]);

  const handleProfileSelect = useCallback((profileId: number) => {
    setSelectedProfileId(profileId);
  }, []);

  const handleNext = () => {
    if (selectedProfileId) {
      setStep('detail');
    }
  };

  const handleBack = () => {
    setStep('profile');
  };

  const handleClose = () => {
    setStep('profile');
    setSelectedProfileId(null);
    setSelectedPosition(null);
    setMessage('');
    onClose();
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
        handleClose();
        openModal('applyComplete', { postId });
      },
      onError: (error) => {
        console.error('Failed to apply for project:', error);
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      {/* 프로필 선택 */}
      {step === 'profile' && (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-1">
            <div className="bg-primary-900 h-[3px] flex-1" />
            <div className="h-[3px] flex-1 bg-gray-400" />
          </div>
          <div>
            <p className="body-7 flex">
              <span className="text-gray-800">해당 프로필로 지원할까요?</span>
              <span className="text-red-100"> *</span>
            </p>
            <p className="body-10 text-gray-700">
              마이페이지에서 설정한 프로필 중 한 가지를 선택해주세요
            </p>
          </div>
          <div>
            <MoProfileSlider
              onProfileSelect={handleProfileSelect}
              initialProfileId={selectedProfileId} // 이전에 선택한 프로필 ID 전달
            />
          </div>
          <div className="mt-1 flex gap-2">
            <Button className="body-5 flex-1 bg-gray-300 py-4 text-gray-800" onClick={handleClose}>
              취소하기
            </Button>
            <Button
              className={`body-5 flex-1 py-4 ${
                selectedProfileId === null
                  ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                  : 'bg-primary-900 text-gray-0'
              }`}
              onClick={handleNext}
              disabled={selectedProfileId === null}
            >
              다음으로
            </Button>
          </div>
        </div>
      )}

      {/* 상세 정보 입력 */}
      {step === 'detail' && (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-1">
            <div className="bg-primary-900 h-[3px] flex-1" />
            <div className="h-[3px] flex-1 bg-gray-400" />
          </div>
          <div className="flex flex-col gap-3">
            <PartDropdown onPositionSelect={setSelectedPosition} positions={positions} />
            <MessageTextarea value={message} onChange={setMessage} />
          </div>
          <div className="flex gap-2">
            <Button className="body-5 flex-1 bg-gray-300 py-4 text-gray-800" onClick={handleBack}>
              이전으로
            </Button>
            <Button
              className={`body-5 flex-1 py-4 ${
                message.length > 250 || selectedPosition === null
                  ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                  : 'bg-primary-900 text-gray-0'
              }`}
              onClick={handleSubmit}
              disabled={message.length > 250 || selectedPosition === null}
            >
              지원하기
            </Button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default ApplyModalMo;
