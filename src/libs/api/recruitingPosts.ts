import axios from 'axios';
import { PagedProjects } from '@/types/project';
import qs from 'qs';

interface GetRecruitingPostsParams {
  status?: string;
  position?: string;
  progressWay?: string;
  page: number;
  size: number;
  sort?: string[];
}

export const getRecruitingPosts = async (params: GetRecruitingPostsParams) => {
  console.log(params);
  const response = await axios.get<{ result: PagedProjects }>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/recruiting-posts`,
    {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'indices', allowDots: true }),
    },
  );

  return response.data.result;
};
