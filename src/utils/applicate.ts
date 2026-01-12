export const ApplicationStatus = {
  MATCHED: 'MATCHED',
  TEMP_SAVED: 'TEMP_SAVED',
  MATCHING: 'MATCHING',
  MATCH_FAILED: 'MATCH_FAILED',
} as const;

export type ApplicationStatusType = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
