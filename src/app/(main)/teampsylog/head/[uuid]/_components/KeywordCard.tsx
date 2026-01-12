'use client';

import Loading from '@/components/common/Loading';
import { useGetRandomKeywords } from '@/hooks/queries/useKeyword';
import { useRequesterInfo } from '@/hooks/queries/useRequesterInfo';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const KeywordCard = () => {
  const params = useParams();
  const uuid = String(params.uuid);

  const { data: requesterInfo, isFetching } = useRequesterInfo(uuid);
  const { data: randomKeywords, isFetching: isFetchingKeywords } = useGetRandomKeywords(uuid);

  const hasKeywords = randomKeywords?.keywords && randomKeywords.keywords.length > 0;

  return (
    <section
      className={
        `relative my-2.5 flex min-h-100 flex-col gap-10 overflow-hidden rounded-2xl bg-gray-100 px-2.5 py-9.5 ` +
        (hasKeywords ? 'items-center justify-center' : 'items-center justify-center')
      }
    >
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
      {isFetching || isFetchingKeywords ? (
        <Loading />
      ) : (
        <>
          {hasKeywords ? (
            <>
              <div className="relative z-10 flex flex-col justify-center gap-2 text-center">
                <p className="body-3">{requesterInfo?.requesterName}님의 팀피셜록</p>
                <p className="body-9 whitespace-pre-line text-gray-700">{`팀피셜록은 다른 동료들이\n소프트스킬 기반으로 작성해준 키워드입니다`}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                {randomKeywords.keywords.map((item, idx) => (
                  <Image
                    key={idx}
                    src={`/images/keywords/${item.keywordName}.svg`}
                    alt={item.keywordName}
                    className="h-13.5"
                    width={200}
                    height={54}
                    style={{
                      transform:
                        idx === 0
                          ? 'rotate(-5.078deg)'
                          : idx === 1
                            ? 'rotate(4.223deg)'
                            : 'rotate(-3.057deg)',
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/gray_teamficial_symbol.svg"
                alt=""
                width={54}
                height={54}
                className="mx-auto mb-1"
              />
              <div className="relative z-10 flex flex-col justify-center gap-2 text-center">
                <p className="body-3">{requesterInfo?.requesterName}님의 팀피셜록</p>
                <p className="body-9 whitespace-pre-line text-gray-700">{`아직 소프트스킬 키워드가 없어요!\n${requesterInfo?.requesterName}님의 팀피셜록을 작성해 키워드를 추가해주세요`}</p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default KeywordCard;
