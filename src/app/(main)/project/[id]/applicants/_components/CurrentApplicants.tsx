import React, { useState, useEffect } from 'react';
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
      profilePosition: applicants.find((app) => app.applicationId === applicationId)
        ?.profilePosition,
    });
  };

  // 화면 너비에 따라 cardStyle 분기
  const [cardStyle, setCardStyle] = useState<'desktop' | 'mobile'>('mobile');

  useEffect(() => {
    setCardStyle(window.innerWidth >= 1024 ? 'desktop' : 'mobile');
    const handleResize = () => {
      setCardStyle(window.innerWidth >= 1024 ? 'desktop' : 'mobile');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 필터 관리
  const handleChange = (value: string) => {
    if (value === 'ALL' || !value) {
      setRecruit('ALL');
      onFilterChange?.(undefined);
    } else {
      setRecruit(value);
      onFilterChange?.(value as unknown as PositionType);
    }
  };

  const filteredApplicants = filter
    ? applicants.filter((item) => item.profilePosition === POSITION_KR[filter])
    : applicants;

  return (
    <div className="flex flex-col">
      <div className="desktop:hidden -mx-4 h-4 bg-gray-200" />
      <div className="desktop:py-5 flex items-center justify-between pt-3 pb-4">
        <p className="title-4 desktop:title-2 text-gray-900">지원자 현황</p>
        <DropdownSmall
          name="recruit"
          value={recruit}
          placeholder="모집분야"
          onChange={handleChange}
          options={RECRUIT_OPTIONS}
        />
      </div>
      {filteredApplicants.length > 0 && (
        <div
          className={
            cardStyle === 'desktop'
              ? 'desktop:grid-cols-3 desktop:gap-4 grid gap-2'
              : 'desktop:hidden grid gap-2'
          }
        >
          {filteredApplicants.map((item) => (
            <CurrentApplicantItem
              key={item.applicationId}
              item={item}
              cardStyle={cardStyle}
              onClick={() => handleApplicantClick(item.applicationId, recruitingPostId!)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentApplicants;
