import { POSITION_VALUES } from '@/utils/position';
import { Period, ProgressWay } from '@/utils/project';
import { z } from 'zod';

export const recruitFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  recruitingPositions: z
    .array(
      z.object({
        position: z.enum(POSITION_VALUES),
        count: z.number().min(1, '인원 수를 입력해주세요'),
      }),
    )
    .min(1, '최소 1개 이상의 모집 분야가 필요합니다'),
  progressWay: z.enum(ProgressWay),
  startDate: z.string({
    message: '시작일을 선택해주세요',
  }),
  period: z.enum(Period),
  deadline: z.string({
    message: '마감일을 선택해주세요',
  }),
  contactWay: z.string().min(1, '연락 방법을 입력해주세요'),
  content: z.string().min(1, '프로젝트 내용을 입력해주세요'),
});

export type RecruitFormType = z.infer<typeof recruitFormSchema>;
