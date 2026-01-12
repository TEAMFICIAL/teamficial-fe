import { updateApplicationStatus } from '@/libs/api/application';
import { UpdateApplicationStatus } from '@/types/application';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: UpdateApplicationStatus) => updateApplicationStatus(status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currentApplicants'],
      });
    },
  });
};
