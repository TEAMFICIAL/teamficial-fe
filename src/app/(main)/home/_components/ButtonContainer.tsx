'use client';

import Button from '@/components/common/button/Button';
import DropdownSmall from '@/components/common/DropdownSmall';
import Toggle from '@/components/common/Toggle';
import { DURATION_OPTIONS, RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { useState } from 'react';

type Props = {
  onChange?: (value: string) => void;
};

const ButtonContainer = ({ onChange }: Props) => {
  const [duration, setDuration] = useState('');
  const [recruit, setRecruit] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  const handleChange = (name: string, newValue: string) => {
    if (name === 'duration') setDuration(newValue);
    else if (name === 'recruit') setRecruit(newValue);

    onChange?.(newValue);
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
        <Button className="bg-primary-900 text-gray-0 hover:bg-primary-700">팀원 모집하기</Button>
      </div>
      <Toggle checked={onlyOpen} onChange={setOnlyOpen} label="모집 중만 보기" />
    </main>
  );
};

export default ButtonContainer;
