export const positionMap: Record<string, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DESIGN: '디자인',
  PLAN: '기획',
  PM: 'PM',
  AI: 'AI',
  ANDROID: '안드로이드',
  IOS: 'iOS',
  CLOUD_INFRA: '클라우드/인프라',
  DEV_OPS: '데브옵스',
  ETC: '기타',
};

export const formatPositions = (positions: Array<{ position: string; count: number }>) => {
  return positions.map(({ position, count }) => `${positionMap[position]} ${count}명`).join(', ');
};
