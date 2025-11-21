import {
  RequesterInfo,
  RequestKeyword,
  RequestKeywordComment,
  RequestTeamficialLog,
  ResponseKeyword,
  ResponseKeywordComment,
  ResponseKeywordList,
  ResponseTeamficialLog,
  RequsetHeadKeyword,
  ResponseHeadKeyword,
  ResponseRandomKeywords,
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
  size = 6,
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

export const getKeywordComments = async ({
  keywordId,
  page = 0,
  size = 4,
}: RequestKeywordComment): Promise<ResponseKeywordComment> => {
  const { data } = await api.get<CommonResponse<ResponseKeywordComment>>(
    `teamficial-log/users/${keywordId}`,
    {
      params: {
        page,
        size,
      },
    },
  );
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch keyword comments');
  }

  return data.result;
};

export const putHeadKeywords = async ({
  profileId,
  oldHeadKeywordId,
  keywordId,
}: RequsetHeadKeyword): Promise<ResponseHeadKeyword> => {
  const params: { keywordId: number; oldHeadKeywordId?: number } = {
    keywordId,
  };

  if (oldHeadKeywordId !== 0) {
    params.oldHeadKeywordId = oldHeadKeywordId;
  }

  const { data } = await api.put<CommonResponse<ResponseHeadKeyword>>(
    `/teamficial-log/head-keyword/${profileId}`,
    null,
    { params },
  );
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to update head keywords');
  }

  return data.result;
};

export const getRandomKeywords = async (requesterUuid: string): Promise<ResponseRandomKeywords> => {
  const { data } = await api.get<CommonResponse<ResponseRandomKeywords>>(`/teamficial-log/rand`, {
    params: {
      requesterUuid,
    },
  });
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch random keywords');
  }

  return data.result;
};
