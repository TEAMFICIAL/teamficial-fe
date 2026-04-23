'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';
import { useUserStore } from '@/store/useUserStore';

const Page = () => {
  const router = useRouter();
  const { uuid, _hasHydrated } = useUserStore();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (!_hasHydrated || redirectedRef.current) return;

    redirectedRef.current = true;

    if (uuid) {
      router.replace(`/teampsylog/${uuid}`);
      return;
    }

    router.replace('/login');
  }, [_hasHydrated, router, uuid]);

  return (
    <section className="h-dvh">
      <Loading />
    </section>
  );
};

export default Page;
