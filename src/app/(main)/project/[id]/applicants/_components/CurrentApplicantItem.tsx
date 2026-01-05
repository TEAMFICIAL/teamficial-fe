import { Tag } from '@/components/common/Tag';
import { CurrentApplicant } from '@/types/application';
import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import ProfileTag from '@/components/profile/ProfileTag';

const CurrentApplicantItem = ({
  item,
  onClick,
  cardStyle,
}: {
  item: CurrentApplicant;
  onClick: () => void;
  cardStyle?: string;
}) => {
  const isSelected = item.applicationStatus === '매칭성공';

  const deCardStyle = isSelected
    ? 'desktop:flex hidden flex-col items-center gap-4 rounded-2xl border-[2px] border-primary-900 bg-primary-50 p-10'
    : 'desktop:flex hidden cursor-pointer flex-col items-center gap-4 rounded-2xl border border-gray-300 p-10';

  const moCardStyle = isSelected
    ? 'desktop:hidden flex flex-col w-full gap-1.5 rounded-2xl border-[2px] border-primary-900 bg-primary-50 p-4'
    : 'desktop:hidden flex cursor-pointer flex-col w-full gap-1.5 rounded-2xl border border-gray-300 p-4';

  const tagStyle = isSelected ? 'bg-primary-900 text-gray-0' : 'bg-gray-200 text-gray-700';

  if (cardStyle === 'desktop') {
    return (
      <section className={clsx(deCardStyle)} onClick={onClick}>
        <Image
          src={item.profileImage || '/icons/profile.svg'}
          alt="지원자 사진"
          width={120}
          height={120}
          className="h-30 w-30 rounded-full object-cover"
        />
        <span className="flex flex-col items-center justify-center gap-[2px]">
          <Tag className={tagStyle}>{item.profilePosition}</Tag>
          <p className="title-3 text-gray-800">{item.applicantName}</p>
        </span>
      </section>
    );
  }

  // mobile
  return (
    <section className={clsx(moCardStyle)} onClick={onClick}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={item.profileImage || '/icons/profile.svg'}
            alt="지원자 사진"
            width={120}
            height={120}
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="title-3 text-gray-800">{item.applicantName}</p>
        </div>
        <Tag className={tagStyle}>{item.profilePosition}</Tag>
      </div>
      <div className="flex gap-1">
        {item.keywordList.map((keyword, index) => (
          <ProfileTag key={index}>{keyword}</ProfileTag>
        ))}
      </div>
    </section>
  );
};

export default CurrentApplicantItem;
