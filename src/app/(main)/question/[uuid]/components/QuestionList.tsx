'use client';

import { useState } from 'react';
import QuestionDropdown from './QuestionDropdown';
import { QUESTION_SETS } from '@/constants/Questions';
import Image from 'next/image';
import QuestionAnswer from './QuestionAnswer';

const QuestionList = () => {
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);
  const [selected3, setSelected3] = useState<string | null>(null);
  const [selected4, setSelected4] = useState<string | null>(null);

  return (
    <main className="flex flex-col gap-6 py-4">
      <div className="bg-gray-0 flex flex-col gap-5 rounded-xl border border-gray-300 px-8 pt-6 pb-8">
        <div className="flex gap-1">
          <Image src="/icons/question.svg" alt="question" width={29} height={24} />
          <p className="title-4 text-gray-900">민수님과 함께하며 느낀 민수님의 강점</p>
        </div>
        <div className="flex flex-col gap-2">
          <QuestionDropdown
            options={QUESTION_SETS.set1}
            selected={selected1}
            onSelect={setSelected1}
          />
          <QuestionAnswer />
        </div>
      </div>

      <div className="bg-gray-0 flex flex-col gap-5 rounded-xl border border-gray-300 px-8 pt-6 pb-8">
        <div className="flex gap-1">
          <Image src="/icons/question.svg" alt="question" width={29} height={24} />
          <p className="title-4 text-gray-900">민수님과 함께하며 이런 점이 좋았어요</p>
        </div>
        <div className="flex flex-col gap-2">
          <QuestionDropdown
            options={QUESTION_SETS.set2}
            selected={selected2}
            onSelect={setSelected2}
          />
          <QuestionAnswer />
        </div>
      </div>

      <div className="bg-gray-0 flex flex-col gap-5 rounded-xl border border-gray-300 px-8 pt-6 pb-8">
        <div className="flex gap-1">
          <Image src="/icons/question.svg" alt="question" width={29} height={24} />
          <p className="title-4 text-gray-900">민수님과 성장을 위해서 해주고 싶은 말</p>
        </div>
        <div className="flex flex-col gap-2">
          <QuestionDropdown
            options={QUESTION_SETS.set3}
            selected={selected3}
            onSelect={setSelected3}
          />
          <QuestionAnswer />
        </div>
      </div>

      <div className="bg-gray-0 flex flex-col gap-5 rounded-xl border border-gray-300 px-8 pt-6 pb-8">
        <div className="flex gap-1">
          <Image src="/icons/question.svg" alt="question" width={29} height={24} />
          <p className="title-4 text-gray-900">민수님께 전하고 싶은 피드백이 있어요</p>
        </div>
        <div className="flex flex-col gap-2">
          <QuestionDropdown
            options={QUESTION_SETS.set4}
            selected={selected4}
            onSelect={setSelected4}
          />
          <QuestionAnswer />
        </div>
      </div>
    </main>
  );
};

export default QuestionList;
