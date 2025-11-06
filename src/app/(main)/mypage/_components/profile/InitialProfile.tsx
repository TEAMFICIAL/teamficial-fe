'use client';

import Button from '@/components/common/button/Button';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';

const InitialProfile = () => {
  const { userName } = useUserStore();

  return (
    <div className="bg-gray-0 mb-4 flex rounded-2xl border border-gray-300 px-14 py-8">
      <div className="flex gap-7">
        <Image src="/icons/initial-profile.svg" alt="profile" width={100} height={100} />
        <div>
          <div className="flex flex-col gap-2">
            <p className="body-1 text-gray-900">{userName}님</p>
            <div className="flex items-center gap-2">
              <p className="body-5 text-gray-800">연락수단</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-600">연락수단을 등록해주세요</p>
            </div>
            <div className="flex items-center gap-2 pb-5">
              <p className="body-5 text-gray-800">작업시간</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-600">작업시간대를 선택해주세요</p>
            </div>
            <Button className="bg-primary-50 text-primary-900 border-primary-100 border px-4 py-2">
              팀피셜록에서 대표 키워드 설정하러가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialProfile;
