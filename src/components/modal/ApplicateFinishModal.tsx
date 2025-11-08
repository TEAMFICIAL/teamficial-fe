'use client';

import { ApplicateFinishModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useCloseProject } from '@/hooks/mutation/useCloseProject';

// 팀원 모집을 마칠게요 모달1
const ApplicateFinishModal = ({ isOpen, onClose, recruitingPostId }: ApplicateFinishModalProps) => {
  const handleCancelClick = () => {
    onClose();
  };

  const { mutate: closeProject } = useCloseProject();
  if (!recruitingPostId) return null;

  // TODO: api 연결
  const handleFinishClick = () => {
    closeProject(recruitingPostId, {
      onSuccess: () => {
        console.log('Project closed successfully');
        // TODO: 모달 열기 또는 화면 이동
        onClose();
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
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">팀원 모집을 마치시겠어요?</h3>
        <p className="body-6 mb-10 text-gray-700">
          {`정말 모집을 마치겠습니까? 지금 모집을 마치면 되돌릴 수 없어요`}
        </p>
        <div className="flex gap-2">
          <Button className="bg-gray-300 px-8 py-4 text-gray-800" onClick={handleCancelClick}>
            취소하기
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 px-30 py-4"
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
