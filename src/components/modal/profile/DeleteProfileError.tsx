import Image from 'next/image';
import BaseModal from '..';
import { DeleteProfileErrorModalProps } from '@/constants/ModalList';

const DeleteProfileError = ({ isOpen, onClose }: DeleteProfileErrorModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center px-26 pt-12 pb-2">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">해당 프로필로 지원중인 공고가 있어요</h3>
        <p className="body-6 mb-10 text-gray-700">모집 기한동안은 프로필 삭제가 제한돼요.</p>
      </div>
    </BaseModal>
  );
};

export default DeleteProfileError;
