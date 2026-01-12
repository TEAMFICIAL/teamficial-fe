import { MY_TEAM_DROPDOWN } from '@/constants/Dropdown';

export const getPositionLabel = (value: string) => {
  const item = MY_TEAM_DROPDOWN.find((p) => p.value === value);
  return item ? item.label : value;
};
