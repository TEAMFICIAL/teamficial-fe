import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TeamPsylogCompleteModalProps } from '@/constants/ModalList';

const TeamPsylogCompleteModal = ({
  uuid,
  userName,
  isOpen,
  onClose,
}: TeamPsylogCompleteModalProps) => {
  const router = useRouter();

  const handleHome = () => {
    router.push('/project');
    onClose();
  };

  const handleTeampsylog = () => {
    router.push(`/teampsylog/${uuid}`);
    onClose();
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
          {userName}님의 팀피셜록 작성이 완료됐어요
        </h3>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:body-5 body-7 desktop:px-8 desktop:py-4 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={handleHome}
          >
            홈으로
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 desktop:body-5 body-7 hover:bg-primary-700 desktop:py-4 flex-1 py-3"
            onClick={handleTeampsylog}
          >
            팀피셜록 구경하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default TeamPsylogCompleteModal;
