import Button from '@/components/common/button/Button';
import BaseModal from '..';
import MessageTextarea from './MessageTextarea';
import Profile from './profile/Profile';
import Image from 'next/image';
import { PartnerModalProps } from '@/constants/ModalList';
// import { useModal } from '@/contexts/ModalContext';
import { useGetApplicantProfile } from '@/hooks/queries/useApplicate';
import { useUpdateApplicant } from '@/hooks/mutation/useUpdateApplicant';
import { useQueryClient } from '@tanstack/react-query';
import { ApplicationStatus } from '@/utils/applicate';

const PartnerModal = ({ isOpen, onClose, applicationId, recruitingPostId }: PartnerModalProps) => {
  const { mutate: updateStatus } = useUpdateApplicant();
  // const { openModal } = useModal();
  const queryClient = useQueryClient();

  const { data: profileData } = useGetApplicantProfile({
    recruitingPostId: recruitingPostId,
    applicationId: applicationId,
  });

  if (!profileData) return null;

  const handleFailClick = () => {
    updateStatus(
      {
        recruitingPostId: recruitingPostId,
        applicationId: applicationId,
        applicationStatus: ApplicationStatus.MATCHING,
      },
      {
        onSuccess: () => {
          // 즉시 쿼리 무효화 및 리패치
          queryClient.invalidateQueries({
            queryKey: ['projectApplicants', recruitingPostId],
          });
          onClose();
        },
        onError: (error) => {
          console.error('Failed to update application status:', error);
        },
      },
    );
  };

  const handleSuccessClick = () => {
    updateStatus(
      {
        recruitingPostId: recruitingPostId,
        applicationId: applicationId,
        applicationStatus: ApplicationStatus.TEMP_SAVED,
      },
      {
        onSuccess: () => {
          // 즉시 쿼리 무효화 및 리패치
          queryClient.invalidateQueries({
            queryKey: ['projectApplicants', recruitingPostId],
          });
          onClose();
          // 논의중: 팀원 모집이 완료되었어요 모달
          // openModal('applicantFinish', {});
        },
        onError: (error) => {
          console.error('Failed to update application status:', error);
        },
      },
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} paddingClass="tablet:p-6">
      <div className="desktop:pt-0 flex flex-col pt-1">
        <div className="flex items-start justify-between">
          <div className="desktop:gap-0 flex flex-col gap-1">
            <span className="body-5 text-gray-800">함께할 사람이 생겼어요!</span>
            <p className="body-9 desktop:body-8 desktop:mb-4 text-gray-700">
              한 번 선택한 결정은 되돌릴 수 없으니
              <span className="desktop:hidden block" />
              신중하게 선택해주세요
            </p>
          </div>
          <Image
            src={`/icons/close.svg`}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <Profile profile={profileData} />
        <div>
          <MessageTextarea
            value={profileData.content}
            onChange={() => {}}
            readOnly
            className="desktop:flex hidden"
          />
          <div className="desktop:flex hidden w-full gap-2">
            <Button
              className="body-5 flex-1 bg-gray-300 py-4 text-gray-800"
              onClick={handleFailClick}
            >
              다음에 함께할래요
            </Button>
            <Button
              className="body-5 bg-primary-900 text-gray-0 hover:bg-primary-700 flex-1 py-4"
              onClick={handleSuccessClick}
            >
              함께할래요
            </Button>
          </div>
          <div className="desktop:hidden -mx-4 -mb-5 flex">
            <button
              className="body-7 flex-1 rounded-bl-xl border-0 border-t border-solid border-gray-300 border-t-gray-300 py-3 text-center text-gray-800"
              onClick={handleFailClick}
            >
              다음에 함께할래요
            </button>
            <button
              className="border-t-primary-900 bg-primary-900 text-gray-0 flex-1 rounded-br-xl border-0 border-t border-solid py-3 text-center"
              onClick={handleSuccessClick}
            >
              함께할래요
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default PartnerModal;
