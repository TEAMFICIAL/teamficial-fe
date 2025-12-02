export const Period = {
  WITHIN_1_MONTH: 'WITHIN_1_MONTH',
  ONE_TO_THREE_MONTHS: 'ONE_TO_THREE_MONTHS',
  THREE_TO_SIX_MONTHS: 'THREE_TO_SIX_MONTHS',
  OVER_SIX_MONTHS: 'OVER_SIX_MONTHS',
  FLEXIBLE: 'FLEXIBLE',
} as const;

export type PeriodType = (typeof Period)[keyof typeof Period];

export const Status = {
  OPEN: 'OPEN',
  CONFIRMED: 'CONFIRMED',
  CLOSED: 'CLOSED',
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

export const ProgressWay = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  HYBRID: 'HYBRID',
} as const;

export type ProgressWayType = (typeof ProgressWay)[keyof typeof ProgressWay];
