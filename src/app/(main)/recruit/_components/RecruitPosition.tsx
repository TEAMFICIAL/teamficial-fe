'use client';

import Image from 'next/image';
import React, { useState } from 'react';

type RecruitItem = {
  id: number;
  field: string; // TODO: 나중에 드롭다운 value로 교체 예정
  count: number;
  touched: boolean; // 입력/조작 시도 여부
  error: string | null;
};

const RecruitPosition = () => {
  const [positions, setPositions] = useState<RecruitItem[]>([
    { id: Date.now(), field: '', count: 0, touched: false, error: null },
  ]);

  // 공통: 에러 메시지 생성
  const getErrorMessage = (fieldEmpty: boolean, countZero: boolean) => {
    if (fieldEmpty && countZero) return '분야와 인원수를 입력해주세요.';
    if (fieldEmpty) return '분야를 입력해주세요.';
    if (countZero) return '인원수를 선택해주세요.';
    return null;
  };

  // 항목 추가 (검증 후, 전부 유효할 때만 새 항목 추가)
  const handleAdd = () => {
    setPositions((prev) => {
      const updated = prev.map((item) => {
        const fieldEmpty = item.field.trim() === '';
        const countZero = item.count === 0;
        const error = getErrorMessage(fieldEmpty, countZero);
        return {
          ...item,
          touched: error ? true : item.touched,
          error,
        };
      });

      const hasError = updated.some((i) => i.error);
      if (hasError) {
        return updated;
      }

      return [...updated, { id: Date.now(), field: '', count: 0, touched: false, error: null }];
    });
  };

  const handleRemove = (id: number) => {
    setPositions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDecrement = (id: number) => {
    setPositions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextCount = Math.max(0, item.count - 1);
        const fieldEmpty = item.field.trim() === '';
        const countZero = nextCount === 0;
        return {
          ...item,
          count: nextCount,
          touched: true,
          error: getErrorMessage(fieldEmpty, countZero),
        };
      }),
    );
  };

  const handleIncrement = (id: number) => {
    setPositions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextCount = item.count + 1;
        const fieldEmpty = item.field.trim() === '';
        const countZero = nextCount === 0;
        return {
          ...item,
          count: nextCount,
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
        const isFilled = item.field.trim() !== '' && item.count > 0;

        const borderColor = isError
          ? 'border-red-100'
          : item.touched && isFilled
            ? 'border-gray-600'
            : 'border-gray-300';

        return (
          <div key={item.id} className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between rounded-lg border px-7 py-3 transition-colors ${borderColor}`}
            >
              {/* TODO: 이후 드롭다운으로 교체 */}
              <span className="body-6 w-auto resize-none border-0 focus:ring-0">모집분야</span>

              <div className="flex items-center gap-12">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.count === 0}
                    className={`cursor-pointer rounded-l-sm p-1 ${
                      item.count === 0
                        ? 'cursor-not-allowed bg-gray-100 opacity-50'
                        : 'bg-gray-200 hover:bg-gray-300'
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
                    className={`body-6 bg-gray-100 px-3 py-1 ${
                      item.count === 0 ? 'text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {item.count}명
                  </span>

                  <button
                    onClick={() => handleIncrement(item.id)}
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
  );
};

export default RecruitPosition;
