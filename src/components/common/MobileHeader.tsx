'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  const router = useRouter();

  return (
    <header className="tablet:hidden mx-auto flex w-full max-w-[1024px] items-center py-3">
      <button onClick={() => router.back()} className="mr-[29px] flex items-center">
        <Image src="/icons/header-arrow-left.svg" alt="back" width={30} height={30} />
      </button>
      <span className="body-5 w-[171px] text-center">{title}</span>
    </header>
  );
};

export default MobileHeader;
