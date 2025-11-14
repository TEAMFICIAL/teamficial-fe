import { patchProject } from '@/libs/api/project';
import { Project } from '@/types/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, project }: { postId: number; project: Project }) =>
      patchProject(project, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};
