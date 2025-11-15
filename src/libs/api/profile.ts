import { ResponseProfile } from '@/types/profile';
import api from './api';
import { CommonResponse } from '@/types/common';
import { WORKING_VALUE_MAP } from '@/constants/Dropdown';

export async function getSingleProfile(profileId: number): Promise<ResponseProfile> {
  const { data } = await api.get<CommonResponse<ResponseProfile>>(`profile/${profileId}`);
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch profile');
  }
  return data.result;
}

export async function getProfileList(): Promise<ResponseProfile[]> {
  const { data } = await api.get<CommonResponse<ResponseProfile[]>>('profile');
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to fetch profile list');
  }
  return data.result;
}

export async function updateProfile(
  profileId: number,
  payload: {
    profileName: string;
    workingTime: string;
    links: string[];
    contactWay: string;
  },
): Promise<ResponseProfile> {
  const convertedPayload = {
    ...payload,
    workingTime: WORKING_VALUE_MAP[payload.workingTime] || payload.workingTime,
  };
  const { data } = await api.put<CommonResponse<ResponseProfile>>(
    `profile/${profileId}`,
    convertedPayload,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to update profile');
  }

  return data.result;
}

export async function createProfile(payload: {
  profileName: string;
  workingTime: string;
  links: string[];
  contactWay: string;
}) {
  const convertedPayload = {
    ...payload,
    workingTime: WORKING_VALUE_MAP[payload.workingTime] || payload.workingTime,
  };

  const { data } = await api.post<CommonResponse<ResponseProfile>>(`/profile`, convertedPayload);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to create profile');
  }

  return data.result;
}

export async function deleteProfile(profileId: number): Promise<string> {
  const { data } = await api.delete<CommonResponse<string>>(`profile/${profileId}`);
  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to delete profile');
  }
  return data.result;
}

export const updateProfileImage = async (profileId: number, objectKey: string): Promise<void> => {
  const { data } = await api.put<CommonResponse<string>>(
    `/profile/${profileId}/image?objectKey=${encodeURIComponent(objectKey)}`,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to update profile image');
  }
};
