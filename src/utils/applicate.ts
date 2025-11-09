export const ApplicationStatus = {
  MATCHED: 'MATCHED',
  MATCHING: 'MATCHING',
  MATCH_FAILED: 'MATCH_FAILED',
} as const;

export type ApplicationStatusType = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
