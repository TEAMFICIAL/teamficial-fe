export const RECRUIT_OPTIONS = [
  { label: '모든 파트', value: 'ALL' },
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: 'UXUI디자인', value: 'UI_UX' },
  { label: 'AI', value: 'AI' },
  { label: '안드로이드', value: 'ANDROID' },
  { label: 'iOS', value: 'IOS' },
  { label: '기획', value: 'PLANNER' },
  { label: '마케팅', value: 'MARKETER' },
  { label: 'PM', value: 'PM' },
  { label: '클라우드/인프라', value: 'CLOUD_INFRA' },
  { label: '데브옵스', value: 'DEV_OPS' },
];

export const DURATION_OPTIONS = [
  { label: '온라인', value: 'ONLINE' },
  { label: '오프라인', value: 'OFFLINE' },
  { label: '온/오프라인', value: 'HYBRID' },
];

export const PERIOD_OPTIONS = [
  { label: '1개월 이내', value: 'WITHIN_1_MONTH' },
  { label: '1~3개월', value: 'ONE_TO_THREE_MONTHS' },
  { label: '3~6개월', value: 'THREE_TO_SIX_MONTHS' },
  { label: '6개월 이상', value: 'OVER_6_MONTHS' },
  { label: '미정/협의예정', value: 'FLEXIBLE' },
];

export const RECRUIT_STATUS = [
  { label: '모집중', value: 'MATCHING' },
  { label: '참여확정', value: 'MATCHED' },
  { label: '모집마감', value: 'MATCH_FAILED' },
];

export const APPLICATION_STATUS = [
  { label: '매칭중', value: 'OPEN' },
  { label: '매칭실패', value: 'CLOSED' },
];

export const WORKING_TIME_OPTIONS = [
  { label: '아침에 작업하는게 편해요', value: 'MORNING' },
  { label: '낮에 작업하는게 편해요', value: 'AFTERNOON' },
  { label: '밤에 작업하는게 편해요', value: 'EVENING' },
  { label: '새벽에 작업하는게 편해요', value: 'DAWN' },
];

export const WORKING_VALUE_MAP: Record<string, string> = {
  아침: 'MORNING',
  낮: 'AFTERNOON',
  밤: 'EVENING',
  새벽: 'DAWN',
};
