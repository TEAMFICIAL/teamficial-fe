import Image from 'next/image';
import BaseModal from '.';
import Button from '../common/button/Button';
import { TeamPsylogAskModalProps } from '@/constants/ModalList';
import { useModal } from '@/contexts/ModalContext';
import { useTeamficialLog } from '@/hooks/mutation/useTeamficialLog';

const TeamPsylogAskModal = ({
  isOpen,
  onClose,
  userName,
  uuid,
  formData,
}: TeamPsylogAskModalProps) => {
  const { openModal } = useModal();
  const { mutate: submitLog } = useTeamficialLog();

  const handleClick = () => {
    const body = {
      userUuid: uuid,
      content1: formData.set1.answer,
      content2: formData.set2.answer,
      content3: formData.set3.answer,
    };

    submitLog(body, {
      onSuccess: () => {
        onClose();
        openModal('teamPsylogComplete', { userName, uuid });
      },
    });
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
        <h3 className="title-3 text-gray-800">{userName}님의 팀피셜록 작성을 완료할까요?</h3>
        <div className="flex gap-2">
          <Button className="body-5 bg-gray-300 px-8 py-4 text-gray-800" onClick={onClose}>
            이전으로
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 body-5 hover:bg-primary-700 px-30 py-4"
            onClick={handleClick}
          >
            이대로 완료하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default TeamPsylogAskModal;
