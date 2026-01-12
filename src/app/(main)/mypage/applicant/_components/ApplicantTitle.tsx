'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { APPLICANT_STATUS } from '@/constants/Dropdown';

interface ApplicantTitleProps {
  applicantStatus: string;
  setApplicantStatus: (v: string) => void;
}

const ApplicantTitle = ({ applicantStatus, setApplicantStatus }: ApplicantTitleProps) => {
  return (
    <>
      <div className="tablet:pb-5 tablet:pt-0 tablet:mx-0 mx-4 flex flex-col pt-5 pb-3">
        <p className="tablet:block title-2 hidden pt-7 pb-5 text-gray-900">지원자 현황</p>
        <DropdownSmall
          name="recruitStatus"
          value={applicantStatus}
          placeholder="지원현황"
          onChange={(v) => setApplicantStatus(v)}
          options={APPLICANT_STATUS}
        />
      </div>
    </>
  );
};

export default ApplicantTitle;
