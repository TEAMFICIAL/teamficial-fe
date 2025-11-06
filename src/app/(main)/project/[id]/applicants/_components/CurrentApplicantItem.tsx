import { ApplicantList } from '@/types/profile';
import Image from 'next/image';
import React from 'react';

const CurrentApplicantItem = ({ item }: { item: ApplicantList }) => {
  return (
    <>
      <section
        key={item.applicationId}
        className="flex flex-col items-center gap-4 rounded-2xl border border-gray-300 p-10"
      >
        <Image
          src={item.profileImage || '/icons/profile.svg'}
          alt="지원자 사진"
          width={120}
          height={120}
          className="rounded-full"
        />
        <span className="flex flex-col items-center justify-center gap-[2px]">
          <p className="body-8 rounded-sm bg-gray-200 px-2 py-1 text-gray-700">
            {item.profilePosition}
          </p>
          <p className="title-3 text-gray-800">{item.applicantName}</p>
        </span>
      </section>
    </>
  );
};

export default CurrentApplicantItem;
