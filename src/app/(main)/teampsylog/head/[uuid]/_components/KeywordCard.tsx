'use client';

import { useRequesterInfo } from '@/hooks/queries/useRequesterInfo';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const KeywordCard = () => {
  const params = useParams();
  const uuid = String(params.uuid);

  const requesterInfoResult = useRequesterInfo(uuid);
  const requesterInfo = requesterInfoResult.data;

  return (
    <section className="relative my-2.5 flex flex-col gap-10 overflow-hidden rounded-2xl bg-gray-100 px-2.5 py-8">
      <Image
        src="/icons/question_gray.svg"
        alt=""
        width={159}
        height={121}
        className="absolute z-0"
        style={{
          top: '28px',
          left: '50%',
          transform: 'translateX(-180px)',
          position: 'absolute',
        }}
        aria-hidden="true"
      />
      <Image
        src="/icons/question_gray.svg"
        alt=""
        width={159}
        height={121}
        className="absolute z-0"
        style={{
          bottom: '28px',
          left: '50%',
          transform: 'translateX(10px) rotate(180deg)',
          position: 'absolute',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-center gap-2 text-center">
        <p className="body-3">{requesterInfo?.requesterName}님의 팀피셜록</p>
        <p className="body-9 whitespace-pre-line text-gray-700">{`팀피셜록은 다른 동료들이\n소프트스킬 기반으로 작성해준 키워드입니다`}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/images/keywords/일처리가 빠른.svg"
          alt="일처리가 빠른"
          className="h-13.5"
          width={200}
          height={54}
          style={{ transform: 'rotate(-5.078deg)' }}
        />
        <Image
          src="/images/keywords/꼼꼼한.svg"
          alt="꼼꼼한"
          className="h-13.5"
          width={200}
          height={54}
          style={{ transform: 'rotate(4.223deg)' }}
        />
        <Image
          src="/images/keywords/책임감 있는.svg"
          alt="책임감 있는"
          className="h-13.5"
          width={200}
          height={54}
          style={{ transform: 'rotate(-3.057deg)' }}
        />
      </div>
    </section>
  );
};

export default KeywordCard;
