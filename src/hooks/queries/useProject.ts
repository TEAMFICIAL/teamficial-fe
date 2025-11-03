import { getSingleProject } from '@/libs/api/project';
import { ResponseProject } from '@/types/project';
import { useQuery } from '@tanstack/react-query';

export const useGetProject = ({ postId }: { postId: number }) => {
  return useQuery<ResponseProject>({
    queryKey: ['project', postId],
    queryFn: () => getSingleProject(postId),
  });
};
