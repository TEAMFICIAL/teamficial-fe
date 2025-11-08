'use client';

import DropdownSmall from '@/components/common/DropdownSmall';
import { APPLICATION_STATUS } from '@/constants/Dropdown';

interface ApplicantTitleProps {
  applicantStatus: string;
  setApplicantStatus: (v: string) => void;
}

const ApplicantTitle = ({ applicantStatus, setApplicantStatus }: ApplicantTitleProps) => {
  return (
    <>
      <div className="flex flex-col pb-5">
        <p className="title-2 pt-7 pb-5 text-gray-900">지원자 현황</p>
        <DropdownSmall
          name="recruitStatus"
          value={applicantStatus}
          placeholder="지원현황"
          onChange={(v) => setApplicantStatus(v)}
          options={APPLICATION_STATUS}
        />
      </div>
    </>
  );
};

export default ApplicantTitle;
