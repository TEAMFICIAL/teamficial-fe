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
          className="mb-3 flex flex-col"
        />
        <h3 className="title-3 text-gray-800">정말 삭제하시겠어요?</h3>
        <p className="body-6 mb-10 text-gray-700">{projectName} 게시물이 영구적으로 삭제됩니다</p>
        <div className="flex gap-2">
          <Button className="bg-gray-300 px-8 py-4 text-gray-800" onClick={onClose}>
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

export default DeleteModal;
