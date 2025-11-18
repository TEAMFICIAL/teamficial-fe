import {
  RequesterInfo,
  RequestKeyword,
  RequestTeamficialLog,
  ResponseKeyword,
  ResponseKeywordList,
  ResponseTeamficialLog,
} from '@/types/teampsylog';
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

export async function postTeamficialLog(
  body: RequestTeamficialLog,
): Promise<ResponseTeamficialLog> {
  const { data } = await api.post<CommonResponse<ResponseTeamficialLog>>('/teamficial-log', body);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to submit teamficial log');
  }

  return data.result;
}

export const getRequesterInfo = async (uuid: string): Promise<RequesterInfo> => {
  const { data } = await api.get<CommonResponse<RequesterInfo>>(`/teamficial-log/requester`, {
    params: { requesterUuid: uuid },
  });

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
