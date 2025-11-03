'use client';

const QuestionAnswer = () => {
  return (
    <textarea
      placeholder="질문에 대한 답을 입력해주세요(최대 250자)"
      className="body-6 bg-gray-0 flex resize-none rounded-md border border-gray-300 px-8 pt-5 pb-7.5 text-gray-700 placeholder-gray-500 focus:border-gray-600 focus:outline-none"
    />
  );
};

export default QuestionAnswer;
