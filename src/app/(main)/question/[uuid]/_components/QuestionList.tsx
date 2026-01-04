'use client';

import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { QuestionFormValues } from '@/libs/schemas/questionFormSchema';
import QuestionDropdown from './QuestionDropdown';
import { QUESTION_SETS } from '@/constants/Questions';
import Image from 'next/image';
import QuestionAnswer from './QuestionAnswer';

interface QuestionListProps {
  setValue: UseFormSetValue<QuestionFormValues>;
  watch: UseFormWatch<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
  userName: string;
}

const QuestionList = ({ setValue, watch, errors, userName }: QuestionListProps) => {
  const QUESTION_SECTIONS = [
    {
      key: 'set1',
      title: `${userName}님과 함께하며 느낀 ${userName}님의 강점`,
      set: QUESTION_SETS.set1,
    },
    { key: 'set2', title: `${userName}님과 함께하며 이런 점이 좋았어요`, set: QUESTION_SETS.set2 },
    { key: 'set3', title: `${userName}님과 성장을 위해서 해주고 싶은 말`, set: QUESTION_SETS.set3 },
  ] as const;

  return (
    <div className="tablet:pb-4 flex flex-col gap-6 pt-4 pb-25">
      {QUESTION_SECTIONS.map(({ key, title, set }) => (
        <div
          key={key}
          className="bg-gray-0 tablet:gap-5 tablet:px-8 tablet:pt-6 tablet:pb-8 flex flex-col gap-2 rounded-xl border border-gray-300 px-5 pt-5 pb-7"
        >
          <div className="flex gap-1">
            <Image src="/icons/question.svg" alt="question" width={29} height={24} />
            <p className="tablet:title-4 body-7 text-gray-900">{title}</p>
          </div>
          <div className="flex flex-col gap-2">
            <QuestionDropdown
              options={set}
              selected={watch(`${key}.question`)}
              onSelect={(value) => setValue(`${key}.question`, value)}
              hasError={!!errors[key]?.question}
            />
            {errors[key]?.question && (
              <p className="body-8 text-red-100">{errors[key]?.question?.message}</p>
            )}
            <QuestionAnswer
              value={watch(`${key}.answer`)}
              onChange={(text) => setValue(`${key}.answer`, text)}
              hasError={!!errors[key]?.answer}
            />
            {errors[key]?.answer && (
              <p className="tablet:body-8 body-10 text-red-100">{errors[key]?.answer?.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
