export const ApplicationStatus = {
  MATCHED: 'MATCHED',
  MATCHING: 'MATCHING',
  MATCHING_FAILED: 'MATCHING_FAILED',
};

export type ApplicationStatusType = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
