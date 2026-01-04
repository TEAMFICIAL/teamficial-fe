'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import PositionDropdown from './PositionDropdown';
import { RECRUIT_OPTIONS } from '@/constants/Dropdown';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { PositionType } from '@/utils/position';

interface Props {
  control: Control<RecruitFormType>;
}

const RecruitPosition = ({ control }: Props) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'recruitingPositions',
  });

  const watched = useWatch({
    control,
    name: 'recruitingPositions',
  }) as RecruitFormType['recruitingPositions'];

  const initRef = useRef(false);

  const recruitOptionsWithoutAll = RECRUIT_OPTIONS.filter((opt) => opt.value !== 'ALL');

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if ((!watched || watched.length === 0) && fields.length === 0) {
      append({ position: '' as PositionType, count: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [append]);

  const handleAdd = () => {
    const item =
      watched ??
      fields.map((f) => ({
        position: f.position as PositionType,
        count: f.count ?? 1,
      }));

    const invalid = item.some(
      (v) => !v || !v.position || (typeof v.count === 'number' && v.count < 1),
    );

    if (invalid) {
      setLocalError('모집분야를 선택해주세요');
      return;
    }

    setLocalError(null);
    append({ position: '' as PositionType, count: 1 });
  };

  const handlePositionSelect = (index: number, value: PositionType) => {
    const item = (watched && watched[index]) ?? {
      position: fields[index].position as PositionType,
      count: fields[index].count ?? 1,
    };
    update(index, { ...item, position: value });

    if (localError && index === fields.length - 1) {
      setLocalError(null);
    }
  };

  const handleCount = (index: number, delta: 1 | -1) => {
    const item = (watched && watched[index]) ?? {
      position: fields[index].position as PositionType,
      count: fields[index].count ?? 1,
    };
    const next = Math.max(1, (item.count ?? 1) + delta);
    update(index, { ...item, count: next });
  };

  const handleRemove = (index: number) => {
    remove(index);
    const next = (
      watched ?? fields.map((f) => ({ position: f.position as PositionType, count: f.count ?? 1 }))
    ).filter((_, i) => i !== index);
    if (!next || next.length === 0) {
      append({ position: '' as PositionType, count: 1 });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="body-5 desktop:title-3">모집분야/인원</p>
      <div className="desktop:gap-2 flex flex-col gap-1.5">
        {fields.map((field, index) => {
          const item = (watched && watched[index]) ?? {
            position: field.position as PositionType,
            count: field.count ?? 1,
          };
          const isError = !!localError && index === fields.length - 1;
          const borderColor = isError ? 'border-red-100' : 'border-gray-300';

          return (
            <div key={field.id} className="flex flex-col">
              <div
                className={`desktop:pr-7 flex items-center justify-between rounded-lg border py-3 pr-4 ${borderColor} relative`}
              >
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="desktop:hidden absolute -top-2 -right-2 z-10 block"
                  style={{ padding: 0, background: 'none', border: 'none' }}
                >
                  <Image src="/icons/x-small-button.svg" alt="close" width={18} height={18} />
                </button>
                {/* 모집분야 드롭다운 */}
                <PositionDropdown
                  className="flex-none"
                  options={recruitOptionsWithoutAll}
                  placeholder="모집분야"
                  value={item.position ?? ''}
                  onSelect={(opt) => handlePositionSelect(index, opt.value as PositionType)}
                />
                {/* 인원 증감 및 삭제 */}
                <div className="flex items-center gap-12">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleCount(index, -1)}
                      disabled={item.count === 1}
                      className={`desktop:p-1 desktop:w-8 desktop:h-8 h-6.5 w-7 rounded-l-sm p-0.5 ${item.count === 1 ? 'cursor-not-allowed bg-gray-100 opacity-50' : 'cursor-pointer bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <Image
                        src={item.count === 1 ? '/icons/minus-disabled.svg' : '/icons/minus.svg'}
                        alt="minus"
                        width={24}
                        height={24}
                      />
                    </button>

                    <span className="body-9 desktop:body-6 desktop:px-4 bg-gray-100 px-2 py-1 text-gray-800">
                      {item.count}명
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCount(index, 1)}
                      className="desktop:p-1 desktop:w-8 desktop:h-8 h-6.5 w-7 cursor-pointer rounded-r-sm bg-gray-200 p-0.5 hover:bg-gray-300"
                    >
                      <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="desktop:block hidden cursor-pointer hover:opacity-70"
                  >
                    <Image src="/icons/x-button.svg" alt="close" width={24} height={24} />
                  </button>
                </div>
              </div>

              {isError && <span className="desktop:body-8 body-10 text-red-100">{localError}</span>}
            </div>
          );
        })}
        {/* 유효할 때만 새 항목 추가됨 */}
        <button
          type="button"
          onClick={handleAdd}
          className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-7 py-3 text-gray-700 hover:bg-gray-50"
        >
          <Image src="/icons/plus.svg" alt="plus" width={24} height={24} />
          <span className="body-7 desktop:body-5 text-gray-700">항목 추가</span>
        </button>
      </div>
    </div>
  );
};

export default RecruitPosition;
