'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { APPLIED_TEAMS } from '@/constants/Dropdown';

interface AppliedTitleProps {
  applicantStatus: string;
  setApplicantStatus: (v: string) => void;
}

const AppliedTitle = ({ applicantStatus, setApplicantStatus }: AppliedTitleProps) => {
  return (
    <div className="flex flex-col pb-5">
      <p className="title-2 pt-7 pb-5 text-gray-900">내가 지원한 팀</p>
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
