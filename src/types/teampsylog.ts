export type ResponseKeyword = {
  profileId: number;
  profileName: string;
  headKeywords: string[];
};

export type RequestKeyword = {
  userId: number;
  page?: number;
  size?: number;
};

export type ResponseKeywordList = {
  content: {
    keywordId: number;
    keywordName: string;
    count: number;
    head: boolean;
  }[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};
