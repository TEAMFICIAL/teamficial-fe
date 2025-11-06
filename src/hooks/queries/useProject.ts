import { getCurrentApplicants } from '@/libs/api/application';
import { getSingleProject } from '@/libs/api/project';
import { ResponseApplicantsDetail, ResponseProject } from '@/types/project';
import { PositionType } from '@/utils/position';
import { useQuery } from '@tanstack/react-query';

export const useGetProject = ({ postId }: { postId: number }) => {
  return useQuery<ResponseProject>({
    queryKey: ['project', postId],
    queryFn: () => getSingleProject(postId),
  });
};

export const useGetProjectApplicants = ({
  postId,
  position,
}: {
  postId: number;
  position?: PositionType;
}) => {
  return useQuery<ResponseApplicantsDetail>({
    queryKey: ['projectApplicants', postId, position],
    queryFn: () => getCurrentApplicants(postId, position),
  });
};
