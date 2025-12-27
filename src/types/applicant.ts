export interface Application {
  recruitingPostId: number;
  writerName: string;
  profileImage: string | null;
  title: string;
  tags: string[];
  progressWay: string;
  status: string;
  period: string;
  deadline: string;
  createdAt: string;
}

export interface ResponseApplications {
  content: Application[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface CurrentApplicant {
  recruitingPostId: number;
  recruitingPostStatus: string;
  writerName: string;
  profileImage: string | null;
  title: string;
  tags: string[];
  deadline: string;
  totalApplicants: number;
  createdAt: string;
  dday: number;
}

export interface ResponseCurrentApplicants {
  content: CurrentApplicant[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}
