'use client';

import Image from 'next/image';
import { useDeleteProfile } from '@/hooks/mutation/useDeleteProfile';
import { DeleteProfileModalProps } from '@/constants/ModalList';
import { useModal } from '@/contexts/ModalContext';
import BaseModal from '..';
import Button from '@/components/common/button/Button';
import { useToast } from '@/contexts/ToastContext';

const DeleteProfileModal = ({
  isOpen,
  onClose,
  profileId,
  profileName,
}: DeleteProfileModalProps) => {
  const { mutate: deleteProfile } = useDeleteProfile();
  const { openModal } = useModal();
  const { addToast } = useToast();

  const handleDelete = () => {
    deleteProfile(profileId, {
      onSuccess: () => {
        onClose();
        openModal('profileDeleteComplete', {
          profileName: profileName,
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const code = error.response?.data?.code;
        onClose();

        switch (code) {
          case 'PROFILE4004':
            addToast({
              type: 'error',
              title: '해당 프로필로 지원 중인 공고가 있어 삭제할 수 없어요',
              message: '모집 기한동안은 프로필 삭제가 제한돼요',
            });
            break;

          case 'PROFILE4005':
            addToast({
              type: 'error',
              title: '해당 프로필로 모집 중인 작성글이 있어 삭제할 수 없어요',
              message: '모집 기한동안은 프로필 삭제가 제한돼요',
            });
            break;

          case 'PROFILE4007':
            addToast({
              type: 'error',
              title: '해당 프로필로 지원중인 공고나 모집 중인 작성글이 있어 삭제할 수 없어요',
              message: '모집 기한동안은 프로필 삭제가 제한돼요',
            });
            break;

          default:
            addToast({
              type: 'error',
              title: '프로필 삭제 실패',
              message: '삭제 중 알 수 없는 오류가 발생했습니다.',
            });
        }
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="tablet:h-[55px] tablet:w-[55px] tablet:mb-3 h-[45px] w-[45px]"
        />
        <h3 className="tablet:title-3 body-7 text-gray-800">정말 삭제하시겠어요?</h3>
        <p className="tablet:body-6 body-10 tablet:mb-10 mb-4 text-gray-700">
          한 번 삭제한 프로필은 복구할 수 없어요
        </p>
        <div className="tablet:gap-2 flex w-full gap-1">
          <Button
            className="tablet:block body-5 hidden bg-gray-300 px-8 py-4 text-gray-800"
            onClick={onClose}
          >
            취소하기
          </Button>
          <Button
            className="tablet:hidden body-7 flex-shrink-0 bg-gray-300 px-4 py-2 text-gray-800"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="text-gray-0 tablet:body-5 body-7 tablet:px-40 tablet:py-4 flex-1 bg-red-100 px-4 py-3 hover:bg-red-200"
            onClick={handleDelete}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteProfileModal;
