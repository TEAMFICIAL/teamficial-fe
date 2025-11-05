import { POSITION_VALUES } from '@/utils/position';
import { Period, ProgressWay } from '@/utils/project';
import { z } from 'zod';

export const recruitFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(30),
  recruitingPositions: z
    .array(
      z.object({
        position: z.enum(POSITION_VALUES, {
          message: '모집분야를 선택해주세요',
        }),
        count: z.number().min(1, '인원 수를 입력해주세요'),
      }),
    )
    .min(1, '최소 1개 이상의 모집 분야가 필요합니다'),
  progressWay: z.enum(ProgressWay, {
    message: '진행 방법을 선택해주세요',
  }),
  startDate: z
    .string({
      message: '시작일을 선택해주세요',
    })
    .min(1, '시작일을 선택해주세요'),
  period: z.enum(Period, {
    message: '프로젝트 기간을 선택해주세요',
  }),
  deadline: z
    .string({
      message: '마감일을 선택해주세요',
    })
    .min(1, '마감일을 선택해주세요'),
  contactWay: z.string().min(1, '연락 방법을 입력해주세요'),
  content: z.string().min(50, '최소 50자 이상 작성해주세요.'),
  profileId: z.number().min(1),
});

export type RecruitFormType = z.infer<typeof recruitFormSchema>;
