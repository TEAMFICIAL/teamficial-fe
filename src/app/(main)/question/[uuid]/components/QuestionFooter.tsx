'use client';

import Button from '@/components/common/button/Button';
import { useModal } from '@/contexts/ModalContext';

const QuestionFooter = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal('teamPsylogComplete');
  };

  return (
    <main className="flex w-full justify-end">
      <Button
        className="bg-primary-900 text-gray-0 body-3 hover:bg-primary-700 px-8 py-4"
        onClick={handleClick}
      >
        팀피셜록 전달하기
      </Button>
    </main>
  );
};

export default QuestionFooter;
