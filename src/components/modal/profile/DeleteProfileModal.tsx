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
            alert('수정 중 알 수 없는 오류가 발생했습니다.');
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
