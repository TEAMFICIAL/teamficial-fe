import React from 'react';
import InfoItem from './InfoItem';

const InfoCard = () => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gray-100 p-10">
      <InfoItem label="모집 분야/인원" value="기획 2명, 디자인 1명, 프론트엔드 2명" />
      <div className="flex">
        <InfoItem label="시작 예정일" value="2025년 10월 1일" className="flex-2" />
        <InfoItem label="진행 기간" value="미정/협의 예정" className="flex-1" />
      </div>
      <div className="flex">
        <InfoItem label="진행방식" value="온라인" className="flex-2" />
        <InfoItem
          label="연락방법"
          value="https://open.kakao.com/o/somechatlink"
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default InfoCard;
