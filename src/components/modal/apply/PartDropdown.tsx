import React from 'react';
import DropdownSelect from './profile/Dropdown';
import { PositionType } from '@/utils/position';
import { POSITION_KR } from '@/constants/Translate';

interface ProfileCardProps {
  positions: PositionType[];
  onPositionSelect?: (position: PositionType | null) => void;
}

const PartDropdown = ({ positions, onPositionSelect }: ProfileCardProps) => {
  const positionOptions = positions.map((position) => ({
    value: position,
    label: POSITION_KR[position],
  }));

  const handleSelect = (selectedValue: string | null) => {
    onPositionSelect?.(selectedValue ? (selectedValue as PositionType) : null);
  };
  return (
    <main className="flex flex-col gap-4 pt-5">
      <p className="title-3 text-gray-800">
        어떤 분야를 지원하시나요?
        <span className="text-red-100"> *</span>
      </p>
      <DropdownSelect options={positionOptions} defaultLabel="지원분야" onSelect={handleSelect} />
    </main>
  );
};

export default PartDropdown;
