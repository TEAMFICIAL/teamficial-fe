import { PositionType } from '@/utils/position';
import { PeriodType, ProgressWayType, StatusType } from '@/utils/project';

export type RecruitingPosition = {
  position: PositionType;
  count: number;
};

export type Project = {
  progressWay: ProgressWayType;
  contactWay: string;
  startDate: string;
  period: PeriodType;
  deadline: string;
  status: StatusType;
  content: string;
  title: string;
  recruitingPositions: RecruitingPosition[];
};

export type CreateProject = Project & {
  profileId: number;
};

export type ResponseProject = Project & {
  postId: number;
  profileId: number;
  profileName: string;
  createdAt: string;
};

export type DeleteProject = {
  deletedPostId: number;
  message: string;
};

export type ResponseUpdateProject = Project & {
  createdAt: string;
};

// 모집 글 전체 조회
export type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PagedProjects = {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: ResponseProject[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
};
