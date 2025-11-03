'use client';

import { useModal } from '@/contexts/ModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionFormSchema, QuestionFormValues } from '@/libs/schemas/questionFormSchema';
import QuestionFooter from './QuestionFooter';
import QuestionList from './QuestionList';
import QuestionTitle from './QuestionTitle';

const QuestionTemplate = ({ uuid }: { uuid: string }) => {
  const { openModal } = useModal();
  console.log(uuid);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      set1: { question: '', answer: '' },
      set2: { question: '', answer: '' },
      set3: { question: '', answer: '' },
      set4: { question: '', answer: '' },
    },
  });

  const onSubmit = (data: QuestionFormValues) => {
    console.log('폼 제출됨', data);
    openModal('teamPsylogComplete');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-10 pb-14">
      <QuestionTitle />
      <QuestionList setValue={setValue} watch={watch} errors={errors} />
      <QuestionFooter />
    </form>
  );
};

export default QuestionTemplate;
