'use client';

import LineButton from '@/components/common/button/LineButton';
import { useToast } from '@/contexts/ToastContext';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  const { uuid } = useUserStore();
  const { addToast } = useToast();

  const handleClick = async () => {
    if (!uuid) {
      router.push('/login');
      return;
    }

    router.push(`/teampsylog`);
    const url = `${window.location.origin}/question/${uuid}`;
    await navigator.clipboard.writeText(url);
    addToast({ message: '링크가 복사되었어요' });
  };

  return (
    <>
      <style>{`
        .banner-responsive {
          background-image: url('/icons/banner-mobile.svg');
        }
        @media (min-width: 640px) {
          .banner-responsive {
            background-image: url('/icons/banner.svg');
          }
        }
      `}</style>
      <section className="banner-responsive tablet:h-[235px] tablet:max-w-[944px] tablet:p-10 relative flex h-[196px] max-w-[639px] flex-col gap-10 rounded-2xl bg-cover bg-center p-6">
        <p className="tablet:title-2 body-3 text-gray-900">
          팀피셜록에서 얻은 키워드로
          <br />
          프로젝트를 함께 할 동료를 찾아보세요
        </p>

        <LineButton onClick={handleClick}>팀피셜록 공유하기 →</LineButton>
      </section>
    </>
  );
};

export default Banner;
