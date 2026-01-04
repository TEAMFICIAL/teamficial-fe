'use client';

import { useModal } from '@/contexts/ModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionFormSchema, QuestionFormValues } from '@/libs/schemas/questionFormSchema';
import QuestionFooter from './QuestionFooter';
import QuestionList from './QuestionList';
import QuestionTitle from './QuestionTitle';
import { useRequesterInfo } from '@/hooks/queries/useRequesterInfo';
import Loading from '@/components/common/Loading';
import ErrorDisplay from '@/components/common/Error';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

const QuestionTemplate = ({ uuid }: { uuid: string }) => {
  const router = useRouter();
  const { uuid: myUuid, _hasHydrated } = useUserStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!myUuid) {
      const currentPath = window.location.pathname;
      localStorage.setItem('redirectAfterLogin', currentPath);
      router.replace('/login');
    }
  }, [myUuid, _hasHydrated, router]);

  const { openModal } = useModal();
  const { data, isLoading, error } = useRequesterInfo(uuid);

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
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay message="요청자 정보를 불러오지 못했어요." />;
  if (!data) return null;

  const { requesterName } = data;

  const onSubmit = (data: QuestionFormValues) => {
    openModal('teamPsylogAsk', {
      userName: requesterName,
      uuid: uuid,
      formData: data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tablet:pb-14 mx-10 pb-10">
      <QuestionTitle userName={requesterName} />
      <QuestionList setValue={setValue} watch={watch} errors={errors} userName={requesterName} />
      <QuestionFooter />
    </form>
  );
};

export default QuestionTemplate;
