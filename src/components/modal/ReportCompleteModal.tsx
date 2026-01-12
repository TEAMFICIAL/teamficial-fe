'use client';

import { ReportCompleteModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { usePostReportComment } from '@/hooks/mutation/useReportComment';
import { useToast } from '@/contexts/ToastContext';

const ReportCompleteModal = ({ isOpen, onClose, data }: ReportCompleteModalProps) => {
  const { addToast } = useToast();
  const handleCancelClick = () => {
    onClose();
  };

  const { mutate: reportComment } = usePostReportComment();

  const handleSubmitClick = () => {
    reportComment(data, {
      onSuccess: () => {
        addToast({ message: '신고가 접수되었습니다.' });
        onClose();
      },
      onError: () => {
        addToast({ type: 'error', message: '신고 접수에 실패했습니다. 다시 시도해주세요.' });
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} paddingClass="tablet:p-7">
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-[55px] desktop:h-[55px] mb-2 flex h-11 w-11 flex-col"
        />
        <h3 className="body-7 desktop:title-3 text-gray-800">정말 신고할까요?</h3>
        <p className="body-10 desktop:body-6 desktop:mb-6 mb-4 text-gray-700">
          신고 내용이 팀피셜에게 전달됩니다.
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:px-8 body-5 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={handleCancelClick}
          >
            취소하기
          </Button>
          <Button
            className="text-gray-0 body-5 desktop:py-4 desktop:px-27.75 flex-1 bg-red-100 py-3"
            onClick={handleSubmitClick}
          >
            신고하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ReportCompleteModal;
