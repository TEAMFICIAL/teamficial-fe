import { RequestKeyword, ResponseKeyword, ResponseKeywordList } from '@/types/teampsylog';
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

export async function getKeywordList({
  userId,
  page = 0,
  size = 3,
}: RequestKeyword): Promise<ResponseKeywordList> {
  const { data } = await api.get<CommonResponse<ResponseKeywordList>>(`teamficial-log/${userId}`, {
    params: {
      page,
      size,
    },
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch keyword list');
  }
  return data.result;
}
