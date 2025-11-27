export interface ResponseConfirmedProfile {
  userName: string;
  profileName: string;
  profileImage: string;
  workingTime?: string;
  contactWay?: string;
  position: string;
  keywords: string[];
  links: string[];
}

export type ResponseConfirmedProfiles = ResponseConfirmedProfile[];

export interface MyTeamItem {
  postId: number;
  period: string;
  title: string;
  progressWay: string;
  tags: string[];
  totalMembers: number;
  createAt: string;
}

export interface MyTeamsResponse {
  content: MyTeamItem[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}
