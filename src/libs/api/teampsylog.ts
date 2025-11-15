import { ResponseKeyword } from '@/types/teampsylog';
import api from './api';
import { CommonResponse } from '@/types/common';

export async function getKeywords(profileId: number): Promise<ResponseKeyword> {
  const { data } = await api.get<CommonResponse<ResponseKeyword>>(
    `teamficial-log/head-keyword/${profileId}`,
  );
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch keywords');
  }
  return data.result;
}
