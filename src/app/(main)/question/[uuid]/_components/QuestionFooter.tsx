'use client';

import Button from '@/components/common/button/Button';

const QuestionFooter = () => {
  return (
    <>
      <div className="tablet:flex hidden w-full justify-end">
        <Button
          type="submit"
          className="bg-primary-900 text-gray-0 body-3 hover:bg-primary-700 px-8 py-4"
        >
          팀피셜록 전달하기
        </Button>
      </div>
      <div className="tablet:hidden bg-gray-0 fixed right-0 bottom-0 left-0 z-50 flex w-full gap-2 border-t border-gray-300 px-4 pt-3 pb-5">
        <Button
          type="submit"
          className="body-5 bg-primary-900 text-gray-0 w-full px-5 py-4 text-center"
        >
          팀피셜록 전달하기
        </Button>
      </div>
    </>
  );
};

export default QuestionFooter;
