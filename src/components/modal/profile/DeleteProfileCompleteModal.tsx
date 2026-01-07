import { DeleteProfileCompleteModalProps } from '@/constants/ModalList';
import Button from '../../common/button/Button';
import BaseModal from '../index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DeleteProfileCompleteModal = ({
  isOpen,
  onClose,
  profileName,
}: DeleteProfileCompleteModalProps) => {
  const router = useRouter();
  const displayName = profileName ? profileName.trim() || '새 프로필' : '새 프로필';

  const handleHomeClick = () => {
    onClose();
    router.push('/mypage/profile');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="desktop:w-115 flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-14 desktop:h-14 mb-1 flex h-10 w-10 flex-col"
        />
        <h3 className="desktop:title-3 body-7 desktop:mb-6 mb-4 text-gray-800">
          {displayName}(프로필 명) 삭제가 완료됐어요
        </h3>
        <div className="flex w-full">
          <Button
            onClick={handleHomeClick}
            className="bg-primary-900 text-gray-0 desktop:body-5 body-7 hover:bg-primary-700 desktop:py-4 flex-1 py-3"
          >
            홈으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteProfileCompleteModal;
