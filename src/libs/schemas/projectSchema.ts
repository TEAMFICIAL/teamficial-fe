import { POSITION_VALUES } from '@/utils/position';
import { Period, PeriodType, ProgressWay } from '@/utils/project';
import { z } from 'zod';

const extractTextFromHTML = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

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
  period: z.enum(Object.values(Period) as [PeriodType, ...PeriodType[]], {
    message: '프로젝트 기간을 선택해주세요',
  }),
  deadline: z
    .string({
      message: '마감일을 선택해주세요',
    })
    .min(1, '마감일을 선택해주세요'),
  contactWay: z.string().min(1, '연락 방법을 입력해주세요'),
  content: z.string().refine(
    (html) => {
      const text = extractTextFromHTML(html);
      return text.length >= 50;
    },
    { message: '최소 50자 이상 작성해주세요.' },
  ),
  profileId: z.number().min(1).optional(),
});

export type RecruitFormType = z.infer<typeof recruitFormSchema>;

// create 모드 전용 스키마 (profileId 필수)
export const createRecruitFormSchema = recruitFormSchema.required({
  profileId: true,
});
export type CreateRecruitFormType = z.infer<typeof createRecruitFormSchema>;

// profileId 제외 스키마 (1단계 폼 검증용)
export const recruitFormWithoutProfileSchema = recruitFormSchema.omit({ profileId: true });
export type RecruitFormWithoutProfileType = z.infer<typeof recruitFormWithoutProfileSchema>;

// 프로필 선택 전용 스키마 (2단계 프로필 선택용)
export const profileSelectSchema = z.object({
  profileId: z
    .number({
      error: '프로필을 선택해주세요',
    })
    .min(1, '프로필을 선택해주세요'),
});

export type ProfileSelectType = z.infer<typeof profileSelectSchema>;
