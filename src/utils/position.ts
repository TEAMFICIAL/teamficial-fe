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

export const POSITION_VALUES = [
  Position.FRONTEND,
  Position.BACKEND,
  Position.UI_UX,
  Position.AI,
  Position.ANDROID,
  Position.IOS,
  Position.PLANNER,
  Position.MARKETER,
  Position.PM,
  Position.CLOUD_INFRA,
  Position.DEV_OPS,
  Position.ETC,
] as const;

export type PositionValueLiteral = (typeof POSITION_VALUES)[number];
