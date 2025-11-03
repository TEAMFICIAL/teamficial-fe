'use client';

import { useState } from 'react';
import QuestionDropdown from './QuestionDropdown';
import { QUESTION_SETS } from '@/constants/Questions';
import Image from 'next/image';
import QuestionAnswer from './QuestionAnswer';

const QuestionList = () => {
  const [selections, setSelections] = useState<{
    [key: string]: { question: string | null; answer: string };
  }>({
    set1: { question: null, answer: '' },
    set2: { question: null, answer: '' },
    set3: { question: null, answer: '' },
    set4: { question: null, answer: '' },
  });

  const handleQuestionSelect = (setKey: string, question: string) => {
    setSelections((prev) => ({
      ...prev,
      [setKey]: { ...prev[setKey], question },
    }));
  };

  const handleAnswerChange = (setKey: string, answer: string) => {
    setSelections((prev) => ({
      ...prev,
      [setKey]: { ...prev[setKey], answer },
    }));
  };

  const QUESTION_SECTIONS = [
    { key: 'set1', title: '민수님과 함께하며 느낀 민수님의 강점', set: QUESTION_SETS.set1 },
    { key: 'set2', title: '민수님과 함께하며 이런 점이 좋았어요', set: QUESTION_SETS.set2 },
    { key: 'set3', title: '민수님과 성장을 위해서 해주고 싶은 말', set: QUESTION_SETS.set3 },
    { key: 'set4', title: '민수님께 전하고 싶은 피드백이 있어요', set: QUESTION_SETS.set4 },
  ];

  return (
    <main className="flex flex-col gap-6 py-4">
      {QUESTION_SECTIONS.map(({ key, title, set }) => (
        <div
          key={key}
          className="bg-gray-0 flex flex-col gap-5 rounded-xl border border-gray-300 px-8 pt-6 pb-8"
        >
          <div className="flex gap-1">
            <Image src="/icons/question.svg" alt="question" width={29} height={24} />
            <p className="title-4 text-gray-900">{title}</p>
          </div>
          <div className="flex flex-col gap-2">
            <QuestionDropdown
              options={set}
              selected={selections[key].question}
              onSelect={(q) => handleQuestionSelect(key, q)}
            />
            <QuestionAnswer
              value={selections[key].answer}
              onChange={(a) => handleAnswerChange(key, a)}
            />
          </div>
        </div>
      ))}
    </main>
  );
};

export default QuestionList;
