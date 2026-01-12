'use client';

import { Status, StatusType } from '@/utils/project';
import mapStatusToEng from '@/utils/project/mapStatustoEng';

type DDayProps = {
  status: StatusType | string;
  dday: number;
};

const DDay = ({ status, dday }: DDayProps) => {
  const engStatus = mapStatusToEng(status);

  const getText = () => {
    if (engStatus === Status.OPEN) {
      return dday > 0 ? `D-${dday}` : 'D-DAY';
    }
    return '마감';
  };

  return (
    <p className="desktop:body-6 body-9 desktop:px-3 rounded-sm bg-[#FFD7D9] px-2 py-1 text-red-100">
      {getText()}
    </p>
  );
};

export default DDay;
