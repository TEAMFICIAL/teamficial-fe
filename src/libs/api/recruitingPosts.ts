import axios from 'axios';
import { PagedProjects } from '@/types/project';

interface GetRecruitingPostsParams {
  status?: string;
  position?: string;
  progressWay?: string;
  pageable: {
    page: number;
    size: number;
    sort?: string[];
  };
}

export const getRecruitingPosts = async (params: GetRecruitingPostsParams) => {
  const response = await axios.get<{ result: PagedProjects }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiting-posts`,
    { params },
  );

  return response.data.result;
};
