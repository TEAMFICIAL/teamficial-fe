import Button from '@/components/common/button/Button';
import BaseModal from '..';
import Image from 'next/image';
import { EditProfileCompleteModalProps } from '@/constants/ModalList';
import { useRouter } from 'next/navigation';

const EditProfileCompleteModal = ({ isOpen, onClose }: EditProfileCompleteModalProps) => {
  const router = useRouter();
  const handleClick = () => {
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
          프로필 수정이 완료됐어요
        </h3>
        <div className="flex w-full">
          <Button
            className="bg-primary-900 text-gray-0 desktop:body-5 body-7 hover:bg-primary-700 desktop:py-4 flex-1 py-3"
            onClick={handleClick}
          >
            홈으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditProfileCompleteModal;
