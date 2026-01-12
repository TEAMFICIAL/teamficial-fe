'use client';

import { RecruitCompleteModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';

const RecruitCompleteModal = ({
  isOpen,
  onClose,
  onListClick,
  onDetailClick,
}: RecruitCompleteModalProps) => {
  const handleListClick = () => {
    onClose();
    onListClick?.();
  };

  const handleDetailClick = () => {
    onClose();
    onDetailClick?.();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleListClick}>
      <div className="desktop:w-115 flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-3 flex flex-col"
        />
        <h3 className="desktop:title-3 body-7 text-gray-800">팀원 모집글 작성이 완료되었어요!</h3>
        <p className="desktop:body-6 body-10 desktop:mb-6 mb-4 text-gray-700">
          {`작성한 글은 마이페이지 > 지원자 현황에서 확인할 수 있어요`}
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="body-7 desktop:body-5 desktop:px-8 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={handleListClick}
          >
            목록으로
          </Button>
          <Button
            className="text-gray-0 desktop:body-5 body-7 desktop:py-4 bg-primary-900 hover:bg-primary-700 flex-1 py-3"
            onClick={handleDetailClick}
          >
            작성한 글 보러가기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default RecruitCompleteModal;
