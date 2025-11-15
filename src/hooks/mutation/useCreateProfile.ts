import { createProfile } from '@/libs/api/profile';
import { ResponseProfile } from '@/types/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(['profile'], (old: ResponseProfile[] | undefined) => {
        if (!old) return [newProfile];
        return [...old, newProfile];
      });

      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
