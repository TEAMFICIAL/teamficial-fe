'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/button/Button';
import Toggle from '@/components/common/Toggle';
import { DURATION_OPTIONS, RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { useState } from 'react';
import DropdownSmall from './Dropdown';

type Filters = {
  duration: string;
  recruit: string;
  onlyOpen: boolean;
};

type Props = {
  onChange?: (filters: Filters) => void;
};

const ButtonContainer = ({ onChange }: Props) => {
  const router = useRouter();
  const [duration, setDuration] = useState('');
  const [recruit, setRecruit] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(true);

  const notifyChange = (updates: Partial<Filters>) => {
    const processedFilters = {
      duration,
      recruit: recruit === 'ALL' ? '' : recruit,
      onlyOpen,
      ...updates,
    };

    if (updates.recruit === 'ALL') {
      processedFilters.recruit = '';
    }
    onChange?.(processedFilters);
  };

  const handleChange = (name: string, newValue: string) => {
    if (name === 'duration') {
      setDuration(newValue);
      notifyChange({ duration: newValue });
    } else if (name === 'recruit') {
      setRecruit(newValue);
      notifyChange({ recruit: newValue });
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setOnlyOpen(checked);
    notifyChange({ onlyOpen: checked });
  };

  const handleRecruitClick = () => {
    router.push('/recruit');
  };

  return (
    <main className="flex w-full flex-col justify-between gap-5">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <DropdownSmall
            name="duration"
            value={duration}
            placeholder="진행방식"
            onChange={(value) => handleChange('duration', value)}
            options={DURATION_OPTIONS}
          />
          <DropdownSmall
            name="recruit"
            value={recruit}
            placeholder="모집분야"
            onChange={(value) => handleChange('recruit', value)}
            options={RECRUIT_OPTIONS}
          />
        </div>
        <Button
          className="bg-primary-900 body-5 text-gray-0 hover:bg-primary-700 px-5 py-3"
          onClick={handleRecruitClick}
        >
          팀원 모집하기
        </Button>
      </div>
      <Toggle checked={onlyOpen} onChange={handleToggleChange} label="모집 중만 보기" />
    </main>
  );
};

export default ButtonContainer;
