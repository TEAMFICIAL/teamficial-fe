import { Tag } from '@/components/common/Tag';
import { CurrentApplicant } from '@/types/application';
import Image from 'next/image';
import React from 'react';

const CurrentApplicantItem = ({
  item,
  onClick,
}: {
  item: CurrentApplicant;
  onClick: () => void;
}) => {
  const isSelected = item.applicationStatus === '매칭 성공';

  const cardStyle = isSelected
    ? 'flex flex-col items-center gap-4 rounded-2xl border-[2px] border-primary-900 bg-primary-50 p-10'
    : 'flex cursor-pointer flex-col items-center gap-4 rounded-2xl border border-gray-300 p-10';

  const tagStyle = isSelected ? 'bg-primary-900 text-gray-0' : 'bg-gray-200 text-gray-700';

  return (
    <>
      <section key={item.applicationId} className={cardStyle} onClick={onClick}>
        <Image
          src={item.profileImage || '/icons/profile.svg'}
          alt="지원자 사진"
          width={120}
          height={120}
          className="rounded-full"
        />
        <span className="flex flex-col items-center justify-center gap-[2px]">
          <Tag className={tagStyle}>{item.profilePosition}</Tag>
          <p className="title-3 text-gray-800">{item.applicantName}</p>
        </span>
      </section>
    </>
  );
};

export default CurrentApplicantItem;
