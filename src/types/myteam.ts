export interface ResponseConfirmedProfile {
  userName: string;
  profileName: string;
  profileImage: string;
  workingTime?: string;
  contactWay?: string;
  position: string;
  keywords: string[];
  links: string[];
}

export type ResponseConfirmedProfiles = ResponseConfirmedProfile[];
