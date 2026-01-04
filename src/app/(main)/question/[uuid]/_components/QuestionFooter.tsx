'use client';

import Button from '@/components/common/button/Button';

const QuestionFooter = () => {
  return (
    <div className="tablet:flex tablet:justify-end tablet:static tablet:w-auto tablet:border-t-0 tablet:px-0 tablet:pt-0 tablet:pb-0 tablet:bg-transparent bg-gray-0 fixed right-0 bottom-0 left-0 z-50 flex w-full border-t border-gray-300 px-4 pt-3 pb-5">
      <Button
        type="submit"
        className="tablet:body-3 tablet:w-auto tablet:px-8 body-5 bg-primary-900 text-gray-0 hover:bg-primary-700 w-full px-5 py-4"
      >
        팀피셜록 전달하기
      </Button>
    </div>
  );
};

export default QuestionFooter;
