import { createProfile } from '@/libs/api/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('프로필 생성 중 오류 발생:', error);
    },
  });
};
