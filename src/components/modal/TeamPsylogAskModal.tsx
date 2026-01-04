import Image from 'next/image';
import BaseModal from '.';
import Button from '../common/button/Button';
import { TeamPsylogAskModalProps } from '@/constants/ModalList';
import { useModal } from '@/contexts/ModalContext';
import { useTeamficialLog } from '@/hooks/mutation/useTeamficialLog';
import { useToast } from '@/contexts/ToastContext';

const TeamPsylogAskModal = ({
  isOpen,
  onClose,
  userName,
  uuid,
  formData,
}: TeamPsylogAskModalProps) => {
  const { openModal } = useModal();
  const { addToast } = useToast();
  const { mutate: submitLog, isPending } = useTeamficialLog();

  const handleClick = () => {
    if (isPending) return;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const code = error?.response?.data?.code;

        if (code === 'KEYWORD_COMMENT5001') {
          onClose();
          addToast({
            type: 'error',
            title: '이미 작성된 팀피셜록이 있어요!',
            message: '한 사람에게는 하나의 팀피셜록만 전달할 수 있어요',
          });
          return;
        }
        onClose();
        addToast({ message: '팀피셜록 작성 중 문제가 발생했습니다.' });
      },
    });
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
            {userName}님의 팀피셜록 작성을 완료할까요?
          </h3>
        </div>
        <div className="tablet:gap-2 flex w-full gap-1">
          <Button
            className="tablet:body-5 body-7 tablet:px-8 tablet:py-4 bg-gray-300 px-4 py-2 whitespace-nowrap text-gray-800"
            onClick={onClose}
          >
            이전으로
          </Button>
          <Button
            className="bg-primary-900 text-gray-0 tablet:body-5 body-7 hover:bg-primary-700 tablet:px-30 tablet:py-4 w-full px-4 py-2"
            onClick={handleClick}
          >
            {isPending ? (
              <span className="border-gray-0 inline-block h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            ) : (
              '이대로 완료하기'
            )}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default TeamPsylogAskModal;
