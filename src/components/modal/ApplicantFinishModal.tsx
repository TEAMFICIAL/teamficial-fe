'use client';

import { ApplicantFinishModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';

// 팀원 모집을 마칠게요 모달2
const ApplicantFinishModal = ({ isOpen, onClose }: ApplicantFinishModalProps) => {
  const handleCancelClick = () => {
    onClose();
  };

  const handleFinishClick = () => {
    onClose();
    // 마이페이지 지원자 현황으로 이동
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">팀원 모집이 완료되었어요!</h3>
        <p className="body-6 mb-10 text-gray-700">
          {`마이페이지 > 지원자 현황에서 팀원정보를 확인할 수 있어요`}
        </p>
        <div className="flex gap-2">
          <Button className="bg-gray-300 px-8 py-4 text-gray-800" onClick={handleCancelClick}>
            홈으로
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 px-30 py-4"
            onClick={handleFinishClick}
          >
            팀원 확인하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplicantFinishModal;
