import { ResponseProfile } from '@/types/profile';
import api from './api';
import { CommonResponse } from '@/types/common';

export async function getSingleProfile(profileId: number): Promise<ResponseProfile> {
  const { data } = await api.get<CommonResponse<ResponseProfile>>(`profile/${profileId}`);
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch profile');
  }
  return data.result;
}
