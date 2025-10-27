'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import PositionDropdown from './PositionDropdown';
import { RECRUIT_OPTIONS } from '@/constants/Dropdown';

type RecruitItem = {
  id: number;
  fieldValue: string;
  fieldLabel: string;
  count: number;
  touched: boolean;
  error: string | null;
};

const RecruitPosition = () => {
  const [positions, setPositions] = useState<RecruitItem[]>([
    { id: Date.now(), fieldValue: '', fieldLabel: '', count: 1, touched: false, error: null },
  ]);

  const handleAdd = () => {
    setPositions((prev) => {
      const updated = prev.map((item) => {
        const fieldEmpty = !item.fieldValue;
        return {
          ...item,
          touched: true,
          error: fieldEmpty ? '분야를 입력해주세요.' : null,
        };
      });
      if (updated.some((i) => i.error)) return updated;
      return [
        ...updated,
        { id: Date.now(), fieldValue: '', fieldLabel: '', count: 1, touched: false, error: null },
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
        const next = Math.max(1, item.count + delta);
        const fieldEmpty = !item.fieldValue;
        return {
          ...item,
          count: next,
          touched: true,
          error: fieldEmpty ? '분야를 입력해주세요.' : null,
        };
      }),
    );
  };

  const handleSelectField = (id: number, value: string, label: string) => {
    setPositions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          fieldValue: value,
          fieldLabel: label,
          error: null,
        };
      }),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">모집분야/인원</p>
      <div className="flex flex-col gap-2">
        {positions.map((item) => {
          const isError = !!item.error;
          const isFilled = !!item.fieldValue && item.count > 0;

          const borderColor = isError
            ? 'border-red-100'
            : item.touched && isFilled
              ? 'border-gray-600'
              : 'border-gray-300';

          return (
            <div key={item.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between rounded-lg border py-3 pr-7 ${borderColor}`}
              >
                {/* 모집분야 드롭다운 */}
                <PositionDropdown
                  className="flex-none"
                  options={RECRUIT_OPTIONS}
                  placeholder="모집분야"
                  value={item.fieldValue}
                  disabled={!!item.fieldValue} // 선택 후 잠금
                  onSelect={(opt) => handleSelectField(item.id, opt.value, opt.label)}
                />
                {/* 인원 증감 및 삭제 */}
                <div className="flex items-center gap-12">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleCount(item.id, -1)}
                      disabled={item.count === 1}
                      className={`rounded-l-sm p-1 ${
                        item.count === 1
                          ? 'cursor-not-allowed bg-gray-100 opacity-50'
                          : 'cursor-pointer bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Image
                        src={item.count === 1 ? '/icons/minus-disabled.svg' : '/icons/minus.svg'}
                        alt="minus"
                        width={24}
                        height={24}
                      />
                    </button>

                    <span className={`body-6 bg-gray-100 px-4 py-1 text-gray-800`}>
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
              {isError && <span className="body-6 text-red-100">{item.error}</span>}
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
    </div>
  );
};

export default RecruitPosition;
