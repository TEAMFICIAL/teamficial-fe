import { CommonResponse } from '@/types/common';
import api from './api';

export async function logout() {
  const { data } = await api.post<CommonResponse<string>>('auth/logout');

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to logout');
  }
  return data.result;
}
