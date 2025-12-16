'use client';

import { DeleteModalProps } from '@/constants/ModalList';
import Button from '../common/button/Button';
import BaseModal from './index';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDeleteProject } from '@/hooks/mutation/useDeleteProject';

const DeleteModal = ({ isOpen, onClose, postId, projectName }: DeleteModalProps) => {
  const router = useRouter();
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = () => {
    if (!postId) return;

    deleteProject(postId, {
      onSuccess: () => {
        onClose();
        router.push('/project');
        router.refresh();
      },
      onError: (error) => {
        console.error('Failed to delete project:', error);
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
          className="desktop:mb-3 desktop:w-14 desktop:h-14 mb-1 flex h-10 w-10 flex-col"
        />
        <h3 className="desktop:title-3 body-7 text-gray-800">정말 삭제하시겠어요?</h3>
        <p className="desktop:body-6 body-10 desktop:mb-10 mb-4 text-gray-700">
          {`'${projectName}' 게시물이 영구적으로 삭제됩니다`}
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
            className="text-gray-0 desktop:body-5 body-7 desktop:px-40 desktop:py-4 flex-1 bg-red-100 py-3 hover:bg-red-200"
            onClick={handleDelete}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteModal;
