'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProfile } from '@/libs/api/profile';

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => deleteProfile(profileId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });
};
