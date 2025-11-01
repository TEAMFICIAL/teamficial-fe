'use client';

import { useState } from 'react';
import QuestionDropdown from './QuestionDropdown';
import { QUESTION_SETS } from '@/constants/Questions';

const QuestionList = () => {
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);
  const [selected3, setSelected3] = useState<string | null>(null);
  const [selected4, setSelected4] = useState<string | null>(null);

  return (
    <>
      <QuestionDropdown options={QUESTION_SETS.set1} selected={selected1} onSelect={setSelected1} />
      <QuestionDropdown options={QUESTION_SETS.set2} selected={selected2} onSelect={setSelected2} />
      <QuestionDropdown options={QUESTION_SETS.set3} selected={selected3} onSelect={setSelected3} />
      <QuestionDropdown options={QUESTION_SETS.set4} selected={selected4} onSelect={setSelected4} />
    </>
  );
};

export default QuestionList;
