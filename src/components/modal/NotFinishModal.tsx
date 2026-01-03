'use client';

import { BaseModalProps } from '@/constants/ModalList';
import BaseModal from './index';
import Image from 'next/image';
import Button from '../common/button/Button';

interface NotFinishModalProps extends BaseModalProps {
  onConfirm?: () => void;
}

const NotFinishModal = ({ isOpen, onClose, onConfirm }: NotFinishModalProps) => {
  const handleLeave = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-14 desktop:h-14 mb-1 flex h-10 w-10 flex-col"
        />
        <h3 className="desktop:title-3 body-7 text-gray-800">
          아직 모집글 작성이 완료되지 않았어요.
        </h3>
        <p className="desktop:body-6 body-10 desktop:mb-10 mb-4 text-gray-700">
          지원하지 않고 나가면 작성한 내용이 사라져요
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:body-5 body-7 desktop:px-8 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={handleLeave}
          >
            나가기
          </Button>
          <Button
            className="text-gray-0 desktop:body-5 body-7 desktop:px-40 desktop:py-4 bg-primary-900 hover:bg-primary-700 flex-1 py-3"
            onClick={onClose}
          >
            계속 작성하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default NotFinishModal;
