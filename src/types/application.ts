import { ApplicationStatusType } from '@/utils/applicate';

// 모집 글 지원자 조회
export type CurrentRecruitingPost = {
  recruitingPostId: number;
  recruitingPostTitle: string;
  recruitingPostContent: string;
  progressWay: string;
  contactWay: string;
  startDate: string;
  period: string;
  deadline: string;
  recruitingDetails: string[];
  createdAt: string;
  dday: number;
};

export type CurrentApplicant = {
  applicationId: number;
  profileId: number;
  applicantName: string;
  profilePosition: string;
  profileImage: string;
  applicationStatus: string;
};

export type ResponseApplicantsDetail = {
  recruitingPost: CurrentRecruitingPost;
  applicantList: CurrentApplicant[];
};

// 지원자 프로필 조회
export type ResponseProfile = {
  profileId: number;
  userId: number;
  userName: string;
  profileImageUrl: string;
  profileName: string;
  workingTime: string;
  links: string[];
  contactWay: string;
  createdAt: string;
  modifiedAt: string;
  headKeywords: string[];
  uuid: string;
};

export type ApplicationResponse = {
  applicationId: number;
  content: string;
  profile: ResponseProfile;
};

// 지원자 합불 정하기
export type UpdateApplicationStatus = {
  recruitingPostId: number;
  applicationId: number;
  applicationStatus: ApplicationStatusType;
};
