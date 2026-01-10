'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
  progress?: number;
}

const MobileHeader = ({ title, progress }: MobileHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <header className="tablet:hidden bg-gray-0 relative z-30 w-full">
        <div className="mx-auto max-w-[1024px]">
          <div className="-mx-4 flex items-center px-4 py-3">
            <div className="flex flex-1">
              <button onClick={() => router.back()} className="flex cursor-pointer items-center">
                <Image src="/icons/header-arrow-left.svg" alt="back" width={30} height={30} />
              </button>
            </div>
            <div className="flex flex-1 justify-center">
              <span className="body-5 text-center">{title}</span>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </header>
      {/* 진행 바 */}
      {typeof progress === 'number' ? (
        <div className="tablet:hidden -mx-4 h-[2px] bg-gray-300">
          <div
            className="bg-primary-500 h-full transition-all"
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </div>
      ) : (
        <div className="tablet:hidden -mx-4 h-px bg-gray-300" />
      )}
    </>
  );
};

export default MobileHeader;
