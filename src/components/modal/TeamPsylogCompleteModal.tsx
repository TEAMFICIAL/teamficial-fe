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
    router.push('/home');
    onClose();
  };

  const handleTeampsylog = () => {
    router.push(`/teampsylog/${uuid}`);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6.5">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="flex flex-col"
        />
        <h3 className="title-3 text-gray-800">{userName}님의 팀피셜록 작성이 완료됐어요</h3>
        <div className="flex gap-2">
          <Button className="body-5 bg-gray-300 px-8 py-4 text-gray-800" onClick={handleHome}>
            홈으로
          </Button>
          <Button
            className="text-gray-0 body-5 bg-primary-900 hover:bg-primary-700 px-40 py-4"
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
