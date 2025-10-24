'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/button/Button';
import DropdownSmall from '@/components/common/DropdownSmall';
import Toggle from '@/components/common/Toggle';
import { DURATION_OPTIONS, RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { useState } from 'react';

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
  const [onlyOpen, setOnlyOpen] = useState(false);

  const notifyChange = (updates: Partial<Filters>) => {
    const newFilters = { duration, recruit, onlyOpen, ...updates };
    onChange?.(newFilters);
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
          className="bg-primary-900 text-gray-0 hover:bg-primary-700"
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
