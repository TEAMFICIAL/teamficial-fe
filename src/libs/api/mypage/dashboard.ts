import { ResponseDashboard } from '@/types/project';
import api from '../api';
import { CommonResponse } from '@/types/common';

export async function getDashboard(): Promise<ResponseDashboard> {
  const { data } = await api.get<CommonResponse<ResponseDashboard>>('/my-page/dashboard');

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch dashboard data');
  }

  return data.result;
}
