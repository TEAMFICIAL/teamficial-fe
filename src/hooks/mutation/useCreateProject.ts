import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postProject } from '@/api/project';
import { CreateProject } from '@/types/project';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: CreateProject) => postProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      // TODO: 성공 시 처리 논의
    },
  });
};
