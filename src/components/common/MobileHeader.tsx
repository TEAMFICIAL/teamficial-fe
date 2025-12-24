'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  const router = useRouter();

  return (
    <header className="tablet:hidden mx-auto flex w-full max-w-[1024px] items-center border-b border-gray-300 py-3">
      <div className="flex flex-1">
        <button onClick={() => router.back()} className="flex items-center">
          <Image src="/icons/header-arrow-left.svg" alt="back" width={30} height={30} />
        </button>
      </div>
      <div className="flex flex-1 justify-center">
        <span className="body-5 text-center">{title}</span>
      </div>
      <div className="flex-1"></div>
    </header>
  );
};

export default MobileHeader;
