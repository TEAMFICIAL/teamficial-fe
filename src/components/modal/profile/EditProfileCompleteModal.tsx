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
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="tablet:h-[55px] tablet:w-[55px] tablet:mb-6.5 h-[45px] w-[45px]"
        />

        <p className="tablet:title-3 body-7 tablet:mb-6.5 mb-4 text-gray-800">
          프로필 수정이 완료됐어요
        </p>
        <div className="flex w-full">
          <Button
            onClick={handleClick}
            className="tablet:block body-5 bg-primary-900 text-gray-0 hidden px-56 py-4 text-center"
          >
            홈으로
          </Button>
          <Button
            onClick={handleClick}
            className="tablet:hidden body-7 bg-primary-900 text-gray-0 flex w-full items-center justify-center px-4 py-3"
          >
            목록으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditProfileCompleteModal;
