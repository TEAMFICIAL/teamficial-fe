'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { RECRUIT_STATUS } from '@/constants/Dropdown';
import { useState } from 'react';

const AppliedTitle = () => {
  const [recruitStatus, setRecruitStatus] = useState<string>('');

  return (
    <div className="flex flex-col pb-5">
      <p className="title-2 pt-7 pb-5 text-gray-900">내가 지원한 팀</p>
      <DropdownSmall
        name="recruitStatus"
        value={recruitStatus}
        placeholder="지원현황"
        onChange={(v) => setRecruitStatus(v)}
        options={RECRUIT_STATUS}
      />
    </div>
  );
};

export default AppliedTitle;
