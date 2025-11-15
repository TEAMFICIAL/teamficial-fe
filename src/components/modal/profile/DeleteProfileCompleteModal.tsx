import { DeleteProfileCompleteModalProps } from '@/constants/ModalList';
import Button from '../../common/button/Button';
import BaseModal from '../index';
import Image from 'next/image';

const DeleteProfileCompleteModal = ({
  isOpen,
  onClose,
  profileName,
}: DeleteProfileCompleteModalProps) => {
  const displayName = profileName?.trim() === '' ? '새 프로필' : profileName;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-6.5 flex flex-col"
        />
        <p className="title-3 mb-6.5 text-gray-800">{displayName}(프로필 명) 삭제가 완료됐어요</p>
        <div className="flex gap-2">
          <Button
            onClick={onClose}
            className="body-5 bg-primary-900 text-gray-0 px-56 py-4 text-center"
          >
            홈으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteProfileCompleteModal;
