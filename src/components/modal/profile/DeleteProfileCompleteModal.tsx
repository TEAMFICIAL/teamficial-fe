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
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="tablet:h-[55px] tablet:w-[55px] tablet:mb-6.5 h-[45px] w-[45px]"
        />
        <p className="tablet:title-3 body-7 tablet:mb-6.5 mb-4 text-gray-800">
          {displayName}(프로필 명) 삭제가 완료됐어요
        </p>
        <div className="w-full gap-2">
          <Button
            onClick={handleHomeClick}
            className="tablet:body-5 body-7 bg-primary-900 text-gray-0 tablet:px-56 tablet:py-4 w-full px-4 py-3 text-center"
          >
            홈으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteProfileCompleteModal;
