import { CommonResponse } from '@/types/common';
import { ResponseProject } from '@/types/project';
import api from './api';

export async function getSingleProject(postId: number): Promise<ResponseProject> {
  const { data } = await api.get<CommonResponse<ResponseProject>>(`recruiting-posts/${postId}`);
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch project');
  }
  return data.result;
}
