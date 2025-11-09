import React, { useState } from 'react';
import DropdownSmall from '@/components/common/DropdownSmall';
import { RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { PositionType } from '@/utils/position';
import { POSITION_KR } from '@/constants/Translate';
import CurrentApplicantItem from './CurrentApplicantItem';
import { CurrentApplicant } from '@/types/application';
import { useModal } from '@/contexts/ModalContext';
import { useParams } from 'next/navigation';

const CurrentApplicants = ({
  applicants,
  filter,
  onFilterChange,
}: {
  applicants: CurrentApplicant[];
  filter: PositionType | undefined;
  onFilterChange?: (value: PositionType | undefined) => void;
}) => {
  const { openModal } = useModal();
  const [recruit, setRecruit] = useState<string | undefined>(filter ?? undefined);

  const params = useParams();
  const recruitingPostId = params?.id ? Number(params.id) : undefined;

  const handleApplicantClick = (applicationId: number, recruitingPostId: number) => {
    if (!params) return;
    openModal('partner', {
      applicationId,
      recruitingPostId,
    });
  };

  // 필터 관리
  const handleChange = (value: string) => {
    if (value === 'ALL') {
      setRecruit('ALL');
      onFilterChange?.(undefined);
    } else if (!value) {
      setRecruit('ALL');
      onFilterChange?.(undefined);
    } else {
      setRecruit(value);
      onFilterChange?.(value as unknown as PositionType);
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
          value={recruit}
          placeholder="모집분야"
          onChange={handleChange}
          options={RECRUIT_OPTIONS}
        />
      </div>
      {/* 지원자 현황 그리드 */}
      {filteredApplicants.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {filteredApplicants.map((item) => (
            <CurrentApplicantItem
              key={item.applicationId}
              item={item}
              onClick={() => handleApplicantClick(item.applicationId, recruitingPostId!)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentApplicants;
