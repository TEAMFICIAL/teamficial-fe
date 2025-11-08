import {
  ApplicationResponse,
  ResponseApplicantsDetail,
  UpdateApplicationStatus,
} from '@/types/application';
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

// 지원자 프로필 조회
export async function getApplicantProfile(
  recruitingPostId: number,
  applicationId: number,
): Promise<ApplicationResponse> {
  const { data } = await api.get<CommonResponse<ApplicationResponse>>(
    `my-page/${recruitingPostId}/${applicationId}`,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch applicant profile');
  }
  return data.result;
}

// 지원자 합불 정하기
export async function updateApplicationStatus({
  recruitingPostId,
  applicationId,
  applicationStatus,
}: UpdateApplicationStatus) {
  const { data } = await api.patch<CommonResponse<string>>(
    `my-page/${recruitingPostId}/${applicationId}`,
    {},
    {
      params: {
        applicationStatus,
      },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to update application status');
  }
  return data.result;
}

// 팀원 모집 마감
export async function closeRecruitingPost(recruitingPostId: number) {
  const { data } = await api.patch<CommonResponse<string>>(`my-page/${recruitingPostId}`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to close recruiting post');
  }
  return data.result;
}
