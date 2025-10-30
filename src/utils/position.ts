export const Position = {
  FRONTEND: 'FRONTEND',
  BACKEND: 'BACKEND',
  UI_UX: 'UI_UX',
  AI: 'AI',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  PLANNER: 'PLANNER',
  MARKETER: 'MARKETER',
  PM: 'PM',
  CLOUD_INFRA: 'CLOUD_INFRA',
  DEV_OPS: 'DEV_OPS',
  ETC: 'ETC',
} as const;

export type PositionType = (typeof Position)[keyof typeof Position];
