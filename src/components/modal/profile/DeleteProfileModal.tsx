'use client';

import Image from 'next/image';
import { useDeleteProfile } from '@/hooks/mutation/useDeleteProfile';
import { DeleteProfileModalProps } from '@/constants/ModalList';
import { useModal } from '@/contexts/ModalContext';
import BaseModal from '..';
import Button from '@/components/common/button/Button';
import { isAxiosError } from 'axios';

const DeleteProfileModal = ({
  isOpen,
  onClose,
  profileId,
  profileName,
}: DeleteProfileModalProps) => {
  const { mutate: deleteProfile } = useDeleteProfile();
  const { openModal } = useModal();

  const handleDelete = () => {
    deleteProfile(profileId, {
      onSuccess: () => {
        onClose();
        openModal('profileDeleteComplete', {
          profileName: profileName,
        });
      },
      onError: (error: unknown) => {
        if (isAxiosError<{ code: string; message: string }>(error)) {
          const errorCode = error.response?.data?.code;

          if (errorCode === 'PROFILE4004') {
            onClose();
            openModal('profileDeleteError');
            return;
          }
        }
        console.error('Failed to delete profile:', error);
        alert('프로필 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
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
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">정말 삭제하시겠어요?</h3>
        <p className="body-6 mb-10 text-gray-700">한 번 삭제한 프로필은 복구할 수 없어요</p>
        <div className="flex gap-2">
          <Button className="body-5 bg-gray-300 px-8 py-4 text-gray-800" onClick={onClose}>
            취소하기
          </Button>
          <Button
            className="text-gray-0 body-5 bg-red-100 px-40 py-4 hover:bg-red-200"
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
