import { POSITION_KR } from '@/constants/Translate';

export const formatPositions = (positions: Array<{ position: string; count: number }>) => {
  return positions.map(({ position, count }) => `${POSITION_KR[position]} ${count}명`).join(', ');
};
