import { useEffect, useRef } from 'react';
import { BaseModalProps } from '@/constants/ModalList';
import BaseModal from '.';
import Image from 'next/image';

const ReportErrorModal = ({ isOpen, onClose }: BaseModalProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} paddingClass="tablet:py-14">
      <div className="tablet:w-115 flex w-70 flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-[55px] desktop:h-[55px] mb-2 flex h-11 w-11 flex-col"
        />
        <h3 className="body-7 desktop:title-3 text-gray-800">이미 신고된 키워드입니다.</h3>
        <p className="body-10 desktop:body-6 text-gray-700">어쩌구저쩌구</p>
      </div>
    </BaseModal>
  );
};

export default ReportErrorModal;
