'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/libs/api/profile';
import { ResponseProfile } from '@/types/profile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      profileId: number;
      profileName: string;
      workingTime: string;
      links: string[];
      contactWay: string;
    }) => {
      const { profileId, ...payload } = params;
      return updateProfile(profileId, payload);
    },

    onSuccess: (data: ResponseProfile) => {
      queryClient.invalidateQueries({
        queryKey: ['profile', data.profileId],
      });
    },
  });
};
