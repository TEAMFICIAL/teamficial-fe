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
          className="mb-6.5 flex flex-col"
        />
        <p className="title-3 mb-6.5 text-gray-800">프로필 수정이 완료됐어요</p>
        <div className="flex gap-2">
          <Button
            onClick={handleClick}
            className="body-5 bg-primary-900 text-gray-0 px-56 py-4 text-center"
          >
            홈으로
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditProfileCompleteModal;
