'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import PositionDropdown from './PositionDropdown';

type RecruitItem = {
  id: number;
  fieldValue: string;
  fieldLabel: string;
  count: number;
  touched: boolean;
  error: string | null;
};

const OPTIONS = [
  { label: '프론트엔드', value: 'frontend' },
  { label: '백엔드', value: 'backend' },
  { label: 'UX/UI디자인', value: 'uxui' },
  { label: 'AI', value: 'ai' },
  { label: '안드로이드', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: '기획', value: 'planning' },
  { label: '마케팅', value: 'marketing' },
  { label: 'PM', value: 'pm' },
  { label: '클라우드', value: 'cloud' },
  { label: '인프라', value: 'infrastructure' },
  { label: '데브옵스', value: 'devops' },
];

const getErrorMessage = (fieldEmpty: boolean, countZero: boolean) => {
  if (fieldEmpty && countZero) return '분야와 인원수를 입력해주세요.';
  if (fieldEmpty) return '분야를 입력해주세요.';
  if (countZero) return '인원수를 선택해주세요.';
  return null;
};

const RecruitPosition = () => {
  const [positions, setPositions] = useState<RecruitItem[]>([
    { id: Date.now(), fieldValue: '', fieldLabel: '', count: 0, touched: false, error: null },
  ]);

  const handleAdd = () => {
    setPositions((prev) => {
      const updated = prev.map((item) => {
        const fieldEmpty = !item.fieldValue;
        const countZero = item.count === 0;
        return {
          ...item,
          touched: true,
          error: getErrorMessage(fieldEmpty, countZero),
        };
      });
      if (updated.some((i) => i.error)) return updated;
      return [
        ...updated,
        { id: Date.now(), fieldValue: '', fieldLabel: '', count: 0, touched: false, error: null },
      ];
    });
  };

  const handleRemove = (id: number) => {
    setPositions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCount = (id: number, delta: 1 | -1) => {
    setPositions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = Math.max(0, item.count + delta);
        const fieldEmpty = !item.fieldValue;
        const countZero = next === 0;
        return {
          ...item,
          count: next,
          touched: true,
          error: getErrorMessage(fieldEmpty, countZero),
        };
      }),
    );
  };

  const handleSelectField = (id: number, value: string, label: string) => {
    setPositions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const fieldEmpty = !value;
        const countZero = item.count === 0;
        return {
          ...item,
          fieldValue: value,
          fieldLabel: label,
          touched: true,
          error: getErrorMessage(fieldEmpty, countZero),
        };
      }),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">모집분야/인원</p>

      {positions.map((item) => {
        const isError = !!item.error;
        const isFilled = !!item.fieldValue && item.count > 0;

        const borderColor = isError
          ? 'border-red-500'
          : item.touched && isFilled
            ? 'border-gray-600'
            : 'border-gray-300';

        return (
          <div key={item.id} className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between rounded-lg border py-3 pr-7 ${borderColor}`}
            >
              {/* 모집분야 드롭다운 */}
              <div className="flex items-center">
                <PositionDropdown
                  className="flex-none"
                  options={OPTIONS}
                  placeholder="모집분야"
                  value={item.fieldValue}
                  disabled={!!item.fieldValue} // 선택 후 잠금
                  onSelect={(opt) => handleSelectField(item.id, opt.value, opt.label)}
                />
              </div>
              {/* 인원 증감 및 삭제 */}
              <div className="flex items-center gap-12">
                <div className="flex items-center">
                  <button
                    onClick={() => handleCount(item.id, -1)}
                    disabled={item.count === 0}
                    className={`rounded-l-sm p-1 ${
                      item.count === 0
                        ? 'cursor-not-allowed bg-gray-100 opacity-50'
                        : 'cursor-pointer bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <Image
                      src={item.count === 0 ? '/icons/minus-disabled.svg' : '/icons/minus.svg'}
                      alt="minus"
                      width={24}
                      height={24}
                    />
                  </button>

                  <span
                    className={`body-6 bg-gray-100 px-3 py-1 ${item.count === 0 ? 'text-gray-500' : 'text-gray-800'}`}
                  >
                    {item.count}명
                  </span>

                  <button
                    onClick={() => handleCount(item.id, +1)}
                    className="cursor-pointer rounded-r-sm bg-gray-200 p-1 hover:bg-gray-300"
                  >
                    <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="cursor-pointer hover:opacity-70"
                >
                  <Image src="/icons/x-button.svg" alt="close" width={24} height={24} />
                </button>
              </div>
            </div>

            {/* 에러 문구 */}
            {isError && <span className="body-6 text-red-500">{item.error}</span>}
          </div>
        );
      })}
      {/* 유효할 때만 새 항목 추가됨 */}
      <button
        onClick={handleAdd}
        className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-7 py-3 text-gray-700 hover:bg-gray-50"
      >
        <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
        <span className="body-5 text-gray-700">항목 추가</span>
      </button>
    </div>
  );
};

export default RecruitPosition;
