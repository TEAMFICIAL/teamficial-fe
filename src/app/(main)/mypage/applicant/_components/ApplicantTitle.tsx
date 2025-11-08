'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { RECRUIT_STATUS } from '@/constants/Dropdown';
import { useState } from 'react';

const ApplicantTitle = () => {
  const [applicantStatus, setApplicantStatus] = useState<string>('');

  return (
    <>
      <div className="flex flex-col pb-5">
        <p className="title-2 pt-7 pb-5 text-gray-900">지원자 현황</p>
        <DropdownSmall
          name="recruitStatus"
          value={applicantStatus}
          placeholder="지원현황"
          onChange={(v) => setApplicantStatus(v)}
          options={RECRUIT_STATUS}
        />
      </div>
    </>
  );
};

export default ApplicantTitle;
