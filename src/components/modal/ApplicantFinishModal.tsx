'use client';

import { BaseModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 팀원 모집을 마칠게요 모달2
const ApplicantFinishModal = ({ isOpen, onClose }: BaseModalProps) => {
  const router = useRouter();

  const handleFinishClick = () => {
    onClose();
    router.push('/mypage/');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="desktop:w-115 flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-[55px] desktop:h-[55px] mb-2 flex h-11 w-11 flex-col"
        />
        <h3 className="body-7 desktop:title-3 text-gray-800">팀원 모집이 완료되었어요!</h3>
        <p className="desktop:body-6 body-10 desktop:mb-6 mb-4 text-gray-700">
          {`마이페이지 > 지원자 현황에서 팀원정보를 확인할 수 있어요`}
        </p>
        <div className="desktop:gap-2 flex w-full">
          <Button
            className="text-gray-0 desktop:body-5 body-7 desktop:py-4 bg-primary-900 hover:bg-primary-700 flex-1 py-3"
            onClick={handleFinishClick}
          >
            마이페이지로 돌아가기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplicantFinishModal;
