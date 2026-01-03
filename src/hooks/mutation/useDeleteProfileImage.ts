'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProfileImage } from '@/libs/api/profile';

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => deleteProfileImage(profileId),

    onSuccess: (_, profileId) => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profileId],
      });
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });
};
