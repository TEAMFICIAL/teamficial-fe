import React from 'react';
import { CurrentRecruitingPost } from '@/types/application';
import { formatDate } from '@/utils/project/formatDate';
import InfoItem from '../../_components/InfoItem';

const InfoCard = ({
  startDate,
  period,
  progressWay,
  contactWay,
  recruitingDetails,
}: CurrentRecruitingPost) => {
  const formatPosition = recruitingDetails.join(', ');
  const formatStartDate = formatDate(startDate);

  return (
    <div className="desktop:gap-4 desktop:p-10 desktop:bg-gray-100 desktop:border-none flex flex-col gap-3 rounded-2xl border border-gray-300 bg-gray-50 p-5">
      <InfoItem label="모집 분야/인원" value={formatPosition} />
      <div className="desktop:flex-row desktop:gap-0 flex flex-col gap-3">
        <InfoItem label="시작 예정일" value={formatStartDate} className="flex-2" />
        <InfoItem label="진행 기간" value={period} className="flex-1" />
      </div>
      <div className="desktop:flex-row desktop:gap-0 flex flex-col gap-3">
        <InfoItem label="진행방식" value={progressWay} className="flex-2" />
        <InfoItem label="연락방법" value={contactWay} className="flex-1" />
      </div>
    </div>
  );
};

export default InfoCard;
