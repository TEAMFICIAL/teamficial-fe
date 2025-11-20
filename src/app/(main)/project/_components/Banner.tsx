'use client';

import LineButton from '@/components/common/button/LineButton';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  const { uuid } = useUserStore();

  return (
    <section
      className="relative flex h-[235px] max-w-[944px] flex-col gap-10 rounded-2xl bg-cover bg-center p-10"
      style={{ backgroundImage: `url('/icons/banner.svg')` }}
    >
      <p className="title-2 text-gray-900">
        팀피셜록에서 얻은 키워드로
        <br />
        프로젝트를 함께 할 동료를 찾아보세요
      </p>

      <LineButton onClick={() => router.push(`/question/${uuid}`)}>팀피셜록 요청하기 →</LineButton>
    </section>
  );
};

export default Banner;
