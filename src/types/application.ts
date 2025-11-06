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
