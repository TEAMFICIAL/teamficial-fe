import { ResponseApplicantsDetail } from '@/types/application';
import api from './api';
import { CommonResponse } from '@/types/common';
import { PositionType } from '@/utils/position';

export async function getCurrentApplicants(
  recruitingPostId: number,
  position?: PositionType,
): Promise<ResponseApplicantsDetail> {
  const { data } = await api.get<CommonResponse<ResponseApplicantsDetail>>(
    `my-page/${recruitingPostId}/current-applicants`,
    {
      params: {
        position,
      },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch current applicants');
  }
  return data.result;
}
