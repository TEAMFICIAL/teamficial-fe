import React from 'react';
import InfoItem from './InfoItem';
import { ResponseProject } from '@/types/project';
import { formatDate } from '@/utils/project/formatDate';
import { formatPositions } from '@/utils/project/formatPositions';
import { PERIOD_KR, PROGRESS_WAY_KR } from '@/constants/Translate';

const InfoCard = ({
  startDate,
  period,
  progressWay,
  contactWay,
  recruitingPositions,
}: ResponseProject) => {
  const formatPosition = formatPositions(recruitingPositions);
  const formatStartDate = formatDate(startDate);

  return (
    <div className="desktop:gap-4 desktop:p-10 desktop:bg-gray-100 bg-gray-0 desktop:border-none flex flex-col gap-3 rounded-2xl border border-gray-300 p-5">
      <InfoItem label="모집 분야/인원" value={formatPosition} />
      <div className="desktop:flex">
        <InfoItem label="시작 예정일" value={formatStartDate} className="flex-2" />
        <InfoItem label="진행 기간" value={PERIOD_KR[period]} className="flex-1" />
      </div>
      <div className="desktop:flex">
        <InfoItem label="진행방식" value={PROGRESS_WAY_KR[progressWay]} className="flex-2" />
        <InfoItem label="연락방법" value={contactWay} className="flex-1" />
      </div>
    </div>
  );
};

export default InfoCard;
