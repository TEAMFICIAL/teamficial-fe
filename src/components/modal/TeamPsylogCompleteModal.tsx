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
      <div className="tablet:gap-6.5 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <Image
            src={`/icons/gray_teamficial_symbol.svg`}
            alt="symbol"
            width={55}
            height={55}
            className="tablet:h-[55px] tablet:w-[55px] tablet:mb-6.5 h-[45px] w-[45px]"
          />
          <h3 className="tablet:title-3 body-7 text-gray-800">
            {userName}님의 팀피셜록 작성이 완료됐어요
          </h3>
        </div>
        <div className="tablet:gap-2 flex w-full gap-1">
          <Button
            className="tablet:body-5 body-7 tablet:px-8 tablet:py-4 bg-gray-300 px-4 py-2 whitespace-nowrap text-gray-800"
            onClick={handleHome}
          >
            홈으로
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 tablet:body-5 body-7 hover:bg-primary-700 tablet:px-30 tablet:py-4 w-full px-4 py-2"
            onClick={handleTeampsylog}
          >
            팀피셜록 구경가기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default TeamPsylogCompleteModal;
