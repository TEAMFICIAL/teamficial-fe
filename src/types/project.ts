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
  writerUserId: number;
  writerProfileId: number;
  userName: string;
  createdAt: string;
  dday: number;
  alreadyApplied: boolean;
  writer: boolean;
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

// 모집 글 지원하기
export type PostApplication = {
  profileId: number;
  recruitingPostId: number;
  position: PositionType;
  content?: string;
};

export type ResponseApplication = {
  applicationId: number;
  status: StatusType;
  position: PositionType;
  userId: number;
  profileId: number;
  recruitingPostId: number;
  message: string;
};

// 마이페이지 dashboard Response
export type MyApplication = {
  recruitingPostId: number;
  writerName: string;
  progressWay: string;
  profileImage: string;
  title: string;
  tags: string[];
  status: string;
  period: string;
  deadline: string;
  createdAt: string;
};

export type MyRecruitingPost = {
  recruitingPostId: number;
  recruitingPostStatus: string;
  writerName: string;
  profileImage: string;
  title: string;
  tags: string[];
  deadline: string;
  totalApplicants: number;
  createdAt: string;
  dday: number;
};

export type MyTeamResponses = {
  postId: number;
  period: string;
  title: string;
  progressWay: string;
  tags: string[];
  totalMembers: number;
};

export type ResponseDashboard = {
  myApplications: MyApplication[];
  myRecruitingPost: MyRecruitingPost[];
  myTeamResponses: MyTeamResponses[];
};
