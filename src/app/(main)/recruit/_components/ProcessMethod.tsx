'use client';

import React, { useState } from 'react';
import RadioButton from './RadioButton';
import { DURATION_OPTIONS } from '@/constants/Dropdown';

const ProcessMethod = () => {
  const [method, setMethod] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">진행 방법</p>
      <div className="flex gap-6">
        {DURATION_OPTIONS.map((option) => (
          <RadioButton
            key={option.value}
            id={option.value}
            name="method"
            value={option.value}
            checked={method === option.value}
            label={option.label}
            onChange={setMethod}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessMethod;
