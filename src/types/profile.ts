import { PositionType } from '@/utils/position';
import { TimeType } from '@/utils/workingTime';

// /profile 관련 API
export type CreateProfile = {
  profileName: string;
  position: PositionType;
  workingTime: TimeType;
  links: string[];
  contactWay: string;
};

export type ResponseProfile = {
  profileId: number;
  userId: number;
  userName: string;
  profileImageUrl: string;
  profileName: string;
  position: string;
  workingTime: string;
  links: string[];
  contactWay: string;
  createdAt: string;
  modifiedAt: string;
};

