import React from 'react';
import CurrentApplicantItem from './CurrentApplicantItem';
import { ApplicantList } from '@/types/profile';
import DropdownSmall from '@/components/common/DropdownSmall';
import { RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { PositionType } from '@/utils/position';
import { POSITION_KR } from '@/constants/Translate';

const CurrentApplicants = ({
  applicants,
  filter,
  onFilterChange,
}: {
  applicants: ApplicantList[];
  filter: PositionType | undefined;
  onFilterChange?: (value: PositionType | undefined) => void;
}) => {
  const handleChange = (value: string) => {
    if (!value) {
      onFilterChange?.(undefined);
    } else {
      onFilterChange?.(value as PositionType);
    }
  };

  const filteredApplicants = filter
    ? applicants.filter((item) => {
        return item.profilePosition === POSITION_KR[filter];
      })
    : applicants;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-5">
        <p className="title-2 text-gray-900">지원자 현황</p>
        {/* 파트 선택 드롭다운 */}
        <DropdownSmall
          name="recruit"
          value={filter ?? ''}
          placeholder="모집분야"
          onChange={handleChange}
          options={RECRUIT_OPTIONS}
        />
      </div>
      {/* 지원자 현황 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {filteredApplicants.map((item) => (
          <CurrentApplicantItem key={item.applicationId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CurrentApplicants;
