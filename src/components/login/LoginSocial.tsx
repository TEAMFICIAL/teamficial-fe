import Image from 'next/image';
import { socialConfig } from './LoginSocialList';

type SocialType = 'kakao' | 'naver' | 'google';

interface LoginSocialProps {
  type: SocialType;
  onClick?: () => void;
  isRecentLogin?: boolean;
}

export default function LoginSocial({ type, onClick, isRecentLogin = false }: LoginSocialProps) {
  const config = socialConfig[type];

  return (
    <div className="relative w-full">
      {isRecentLogin && (
        <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
          <Image src="/icons/recent.svg" alt="최근 로그인" width={104} height={32} />
        </div>
      )}
      <div
        className={`tablet:title-3 body-7 tablet:py-5 relative flex w-full cursor-pointer flex-row items-center justify-center rounded-lg px-10 py-4 ${config.bgColor}`}
        onClick={onClick}
      >
        <div className="tablet:h-6 tablet:w-6 tablet:mr-[10px] mr-2 h-5 w-5">
          <Image
            src={config.imageSrc}
            alt={`${config.name} logo`}
            loading="lazy"
            width={24}
            height={24}
          />
        </div>
        <div className={`${config.textColor}`}>{config.name} 계정으로 계속하기</div>
      </div>
    </div>
  );
}
