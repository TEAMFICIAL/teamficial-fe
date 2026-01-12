import { z } from 'zod';

const questionSetSchema = z.object({
  question: z.string().min(1, '질문을 선택해주세요.'),
  answer: z.string().min(1, '답변을 입력해주세요.').max(250, '최대 250자까지 가능합니다.'),
});

export const questionFormSchema = z.object({
  set1: questionSetSchema,
  set2: questionSetSchema,
  set3: questionSetSchema,
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
