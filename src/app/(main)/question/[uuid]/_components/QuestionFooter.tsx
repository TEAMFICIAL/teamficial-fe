'use client';

import Button from '@/components/common/button/Button';

const QuestionFooter = () => {
  return (
    <div className="flex w-full justify-end">
      <Button
        type="submit"
        className="bg-primary-900 text-gray-0 body-3 hover:bg-primary-700 px-8 py-4"
      >
        팀피셜록 전달하기
      </Button>
    </div>
  );
};

export default QuestionFooter;
