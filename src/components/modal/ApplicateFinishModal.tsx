'use client';

import { ApplicateFinishModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useCloseProject } from '@/hooks/mutation/useCloseProject';
import { useModal } from '@/contexts/ModalContext';

// 팀원 모집을 마칠게요 모달1
const ApplicateFinishModal = ({ isOpen, onClose, recruitingPostId }: ApplicateFinishModalProps) => {
  const handleCancelClick = () => {
    onClose();
  };

  const { openModal } = useModal();

  const { mutate: closeProject } = useCloseProject();
  if (!recruitingPostId) return null;

  const handleFinishClick = () => {
    closeProject(recruitingPostId, {
      onSuccess: () => {
        onClose();
        openModal('applicantFinish');
      },
      onError: (error) => {
        console.error('Failed to close project:', error);
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-[55px] desktop:h-[55px] mb-2 flex h-11 w-11 flex-col"
        />
        <h3 className="body-7 desktop:title-3 text-gray-800">팀원 모집을 마치시겠어요?</h3>
        <p className="body-10 desktop:body-6 desktop:mb-10 mb-4 text-gray-700">
          {`정말 모집을 마치겠습니까? 지금 모집을 마치면 되돌릴 수 없어요`}
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:px-8 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={handleCancelClick}
          >
            취소하기
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 desktop:px-30 desktop:py-4 flex-1 py-3"
            onClick={handleFinishClick}
          >
            팀원 모집 마치기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplicateFinishModal;
