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
    <div className="flex flex-col gap-4 rounded-2xl bg-gray-100 p-10">
      <InfoItem label="모집 분야/인원" value={formatPosition} />
      <div className="flex">
        <InfoItem label="시작 예정일" value={formatStartDate} className="flex-2" />
        <InfoItem label="진행 기간" value={period} className="flex-1" />
      </div>
      <div className="flex">
        <InfoItem label="진행방식" value={progressWay} className="flex-2" />
        <InfoItem label="연락방법" value={contactWay} className="flex-1" />
      </div>
    </div>
  );
};

export default InfoCard;
