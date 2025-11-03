'use client';

import Button from '@/components/common/button/Button';
import BaseModal from '../index';
import MessageTextarea from './MessageTextarea';
import ProfileSlider from './profile/ProfileSlider';
import { useModal } from '@/contexts/ModalContext';
import { useState } from 'react';
import { ApplyModalProps } from '@/constants/ModalList';

const ApplyModal = ({ isOpen, onClose }: ApplyModalProps) => {
  const { openModal } = useModal();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.length > 250) return;
    // API 요청
    openModal('applyComplete');
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
          <ProfileSlider />
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
              disabled={message.length > 250}
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
