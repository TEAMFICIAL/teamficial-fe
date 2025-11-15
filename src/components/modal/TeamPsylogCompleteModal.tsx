import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TeamPsylogCompleteModalProps } from '@/constants/ModalList';

const TeamPsylogCompleteModal = ({ isOpen, onClose }: TeamPsylogCompleteModalProps) => {
  const router = useRouter();

  const handleHome = () => {
    router.push('/home');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">팀피셜록 작성이 완료되었어요!</h3>
        <p className="body-6 mb-10 text-gray-700">
          팀원들에게 팀피셜록을 요청하고 나의 소프트스킬을 확인하세요
        </p>
        <div className="flex gap-2">
          <Button className="body-5 bg-gray-300 px-8 py-4 text-gray-800" onClick={handleHome}>
            홈으로
          </Button>
          <Button
            className="text-gray-0 body-5 bg-primary-900 hover:bg-primary-700 px-40 py-4"
            onClick={() => {}}
          >
            내 팀피셜록 요청하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default TeamPsylogCompleteModal;
