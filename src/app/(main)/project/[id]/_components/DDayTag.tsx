'use client';

import { Status, StatusType } from '@/utils/project';

type DDayProps = {
  status: StatusType | string;
  dday: number;
};

const mapStatusToEng = (status: string) => {
  switch (status) {
    case '모집중':
      return 'OPEN';
    case '모집 마감':
      return 'CLOSED';
    default:
      return status;
  }
};

const DDay = ({ status, dday }: DDayProps) => {
  const engStatus = mapStatusToEng(status);

  const getText = () => {
    if (engStatus === Status.OPEN) {
      return dday > 0 ? `D-${dday}` : 'D-DAY';
    }
    return '마감';
  };

  return <p className="body-6 rounded-sm bg-[#FFD7D9] px-3 py-1 text-[#DA1E28]">{getText()}</p>;
};

export default DDay;
