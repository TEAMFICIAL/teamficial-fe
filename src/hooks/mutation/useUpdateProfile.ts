'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/libs/api/profile';
import { ResponseProfile } from '@/types/profile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      profileId: number;
      profileName: string | null;
      workingTime: string | null;
      links: string[];
      contactWay: string | null;
    }) => {
      const { profileId, profileName, workingTime, contactWay, links } = params;

      const convertedPayload = {
        profileName: profileName?.trim() === '' ? null : profileName,
        workingTime: workingTime?.trim() === '' ? null : workingTime,
        contactWay: contactWay?.trim() === '' ? null : contactWay,

        links:
          links.length === 0 || links.every((l) => l.trim() === '')
            ? ['']
            : links.map((l) => (l.trim() === '' ? '' : l.trim())),
      };

      return updateProfile(profileId, convertedPayload);
    },

    onSuccess: (data: ResponseProfile) => {
      queryClient.invalidateQueries({
        queryKey: ['profile', data.profileId],
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
