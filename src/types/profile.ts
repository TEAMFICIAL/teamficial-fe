import { PositionType } from '@/utils/position';
import { TimeType } from '@/utils/workingTime';

// /profile 관련 API
export type CreateProfile = {
  profileName: string;
  position: PositionType;
  workingTime: TimeType;
  links: string[];
  contactWay: string;
};

export type ResponseProfile = {
  profileId: number;
  userId: number;
  userName: string;
  profileImageUrl: string;
  profileName: string;
  position: string;
  workingTime: string;
  links: string[];
  contactWay: string;
  headKeywords: string[];
  createdAt: string;
  modifiedAt: string;
};

// /my-page 관련 API
export type ApplicantProfile = {
  applicationId: number;
  content: string;
  profile: ResponseProfile;
};

export type RecruitingPost = {
  recruitingPostId: number;
  recruitingPostTitle: string;
  recruitingPostContent: string;
  progressWay: string;
  contactWay: string;
  startDate: string;
  period: string;
  deadline: string;
  recruitingDetails: string[];
};

export type ApplicantList = {
  applicationId: number;
  profileId: number;
  applicantName: string;
  profilePosition: string;
  profileImage: string;
};

export type ApplicationStatus = {
  recruitingPost: RecruitingPost;
  applicantList: ApplicantList[];
};

export type CurrentApplicantItem = {
  recruitingPostId: number;
  writerName: string;
  profileImage: string;
  title: string;
  tags: string[];
  deadline: string;
  totalApplicants: number;
  createdAt: string;
};

export type MyApplicants = {
  recruitingPostId: number;
  writerName: string;
  profileImage: string;
  title: string;
  tags: string[];
  status: string;
  period: string;
  deadline: string;
  createdAt: string;
};

export type PagedResponse<T> = {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};
