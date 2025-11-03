import { CommonResponse } from '@/types/common';
import { CreateProject, ResponseProject } from '@/types/project';
import api from './api';

export async function getSingleProject(postId: number): Promise<ResponseProject> {
  const { data } = await api.get<CommonResponse<ResponseProject>>(`recruiting-posts/${postId}`);
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch project');
  }
  return data.result;
}

export async function postProject(project: CreateProject): Promise<ResponseProject> {
  const { data } = await api.post<CommonResponse<ResponseProject>>(`recruiting-posts`, {
    ...project,
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to create project');
  }
  return data.result;
}
