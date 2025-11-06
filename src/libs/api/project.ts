import { CommonResponse } from '@/types/common';
import {
  CreateProject,
  DeleteProject,
  PostApplication,
  ResponseApplication,
  ResponseProject,
} from '@/types/project';
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

export async function deleteProject(postId: number): Promise<DeleteProject> {
  const { data } = await api.delete<CommonResponse<DeleteProject>>(`recruiting-posts/${postId}`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to delete project');
  }
  return data.result;
}

export async function postApplication(application: PostApplication): Promise<ResponseApplication> {
  const { data } = await api.post<CommonResponse<ResponseApplication>>(`applications`, {
    ...application,
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to apply for project');
  }
  return data.result;
}
