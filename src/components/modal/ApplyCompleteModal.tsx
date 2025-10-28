'use client';

import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';

interface ApplyCompleteModalProps {
  onClose: () => void;
}

const ApplyCompleteModal = ({ onClose }: ApplyCompleteModalProps) => {
  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">지원이 완료되었어요!</h3>
        <p className="body-6 mb-10 text-gray-700">
          지원한 프로젝트는 마이페이지에서 합격여부를 알 수 있어요
        </p>
        <div className="flex gap-2">
          <Button className="bg-gray-300 px-8 py-4 text-gray-800" onClick={onClose}>
            닫기
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 px-30 py-4"
            onClick={() => {}}
          >
            지원한 프로젝트 보러가기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplyCompleteModal;
