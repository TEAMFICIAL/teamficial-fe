'use client';

import React, { useState } from 'react';
import RadioButton from './RadioButton';

const ProcessMethod = () => {
  const [method, setMethod] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">진행 방법</p>
      <div className="flex gap-6">
        <RadioButton
          id="online"
          name="method"
          value="online"
          checked={method === 'online'}
          label="온라인"
          onChange={setMethod}
        />
        <RadioButton
          id="offline"
          name="method"
          value="offline"
          checked={method === 'offline'}
          label="오프라인"
          onChange={setMethod}
        />
        <RadioButton
          id="hybrid"
          name="method"
          value="hybrid"
          checked={method === 'hybrid'}
          label="온/오프라인"
          onChange={setMethod}
        />
      </div>
    </div>
  );
};

export default ProcessMethod;
