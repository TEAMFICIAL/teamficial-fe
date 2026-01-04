'use client';

import { ApplyCompleteModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ApplyCompleteModal = ({ isOpen, onClose }: ApplyCompleteModalProps) => {
  const navigate = useRouter();
  const handleClick = () => {
    onClose();
    navigate.push('/mypage');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-14 desktop:h-14 mb-1 flex h-11 w-11 flex-col"
        />
        <h3 className="body-7 desktop:title-3 text-gray-800">지원이 완료되었어요!</h3>
        <p className="body-10 desktop:body-6 desktop:mb-10 mb-4 text-gray-700">
          지원한 프로젝트는 마이페이지에서 합격여부를 알 수 있어요
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:body-5 body-7 desktop:px-8 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={onClose}
          >
            닫기
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 desktop:body-5 body-7 hover:bg-primary-700 flex-1 py-4"
            onClick={handleClick}
          >
            지원한 프로젝트 보러가기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplyCompleteModal;
