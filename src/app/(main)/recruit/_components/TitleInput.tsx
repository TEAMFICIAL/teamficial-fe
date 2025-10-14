'use client';
import React, { useState } from 'react';

const TitleInput = () => {
  const [title, setTitle] = useState(``);

  return (
    <div className="flex flex-col gap-2">
      <input
        className={`body-2 h-18 rounded-lg border-1 border-gray-300 px-8 text-gray-800 placeholder:text-gray-500 ${title.length > 30 ? 'border-red-500' : 'focus:border-gray-600'}`}
        placeholder="제목을 입력해주세요 (최대30자)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className={`body-8 text-gray-500 ${title.length > 30 ? 'text-red-500' : ''}`}>
        {title.length > 30 ? '제목을 30자 이하로 입력해주세요.' : ''}
      </span>
    </div>
  );
};

export default TitleInput;
