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
      <div className="desktop:w-115 flex flex-col items-center">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={55}
          height={55}
          className="desktop:mb-3 desktop:w-14 desktop:h-14 mb-1 flex h-10 w-10 flex-col"
        />
        <h3 className="desktop:title-3 body-7 text-gray-800">정말 삭제하시겠어요?</h3>
        <p className="desktop:body-6 body-10 desktop:mb-6 mb-4 text-gray-700">
          한 번 삭제한 프로필은 복구할 수 없어요
        </p>
        <div className="desktop:gap-2 flex w-full gap-1">
          <Button
            className="desktop:block body-5 hidden bg-gray-300 px-8 py-4 text-gray-800"
            onClick={onClose}
          >
            취소하기
          </Button>
          <Button
            className="desktop:hidden body-7 bg-gray-300 px-4 py-3 text-gray-800"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="text-gray-0 desktop:body-5 body-7 desktop:py-4 flex-1 bg-red-100 py-3 hover:bg-red-200"
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
