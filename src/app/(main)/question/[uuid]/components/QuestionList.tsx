'use client';

import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { QuestionFormValues } from '@/libs/schemas/questionFormSchema';
import QuestionDropdown from './QuestionDropdown';
import { QUESTION_SECTIONS } from '@/constants/Questions';
import Image from 'next/image';
import QuestionAnswer from './QuestionAnswer';
interface QuestionListProps {
  setValue: UseFormSetValue<QuestionFormValues>;
  watch: UseFormWatch<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
}

const QuestionList = ({ setValue, watch, errors }: QuestionListProps) => {
  return (
    <div className="flex flex-col gap-6 py-4">
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
              <p className="body-8 text-red-100">{errors[key]?.answer?.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
