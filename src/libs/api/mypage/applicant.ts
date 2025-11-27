import { ResponseApplications, ResponseCurrentApplicants } from '@/types/applicant';
import { CommonResponse } from '@/types/common';
import api from '../api';
import { MyTeamsResponse, ResponseConfirmedProfiles } from '@/types/myteam';

export async function getMyApplications(
  applicationStatus: string = '',
  page: number = 0,
  size: number = 3,
): Promise<ResponseApplications> {
  const { data } = await api.get<CommonResponse<ResponseApplications>>('/my-page/applications', {
    params: { applicationStatus, page, size },
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch applications');
  }

  return data.result;
}

export async function getCurrentApplicants(
  recruitingStatus: string = '',
  page: number = 0,
  size: number = 3,
): Promise<ResponseCurrentApplicants> {
  const { data } = await api.get<CommonResponse<ResponseCurrentApplicants>>(
    '/my-page/current-applicants',
    {
      params: { recruitingStatus, page, size },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch current applicants');
  }

  return data.result;
}

export const getConfirmedProfile = async (postId: number, position?: string) => {
  const { data } = await api.get<ResponseConfirmedProfiles>(`/confirmed-profile/${postId}`, {
    params: {
      position: position || undefined,
    },
  });

  return data;
};

export async function getMyTeams(page: number = 0, size: number = 3): Promise<MyTeamsResponse> {
  const { data } = await api.get<CommonResponse<MyTeamsResponse>>('/my-page/my-teams', {
    params: { page, size },
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch my teams');
  }

  return data.result;
}
