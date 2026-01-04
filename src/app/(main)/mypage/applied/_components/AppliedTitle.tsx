'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { APPLIED_TEAMS } from '@/constants/Dropdown';

interface AppliedTitleProps {
  applicantStatus: string;
  setApplicantStatus: (v: string) => void;
}

const AppliedTitle = ({ applicantStatus, setApplicantStatus }: AppliedTitleProps) => {
  return (
    <div className="tablet:pb-5 tablet:pt-0 tablet:mx-0 mx-4 flex flex-col pt-5 pb-3">
      <p className="tablet:block title-2 hidden pt-7 pb-5 text-gray-900">내가 지원한 팀</p>
      <DropdownSmall
        name="recruitStatus"
        value={applicantStatus}
        placeholder="지원현황"
        onChange={(v) => setApplicantStatus(v)}
        options={APPLIED_TEAMS}
      />
    </div>
  );
};

export default AppliedTitle;
