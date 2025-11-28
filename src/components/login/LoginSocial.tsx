import Image from 'next/image';
import { socialConfig } from './LoginSocialList';

type SocialType = 'kakao' | 'naver' | 'google';

interface LoginSocialProps {
  type: SocialType;
  onClick?: () => void;
}

export default function LoginSocial({ type, onClick }: LoginSocialProps) {
  const config = socialConfig[type];

  return (
    <div
      className={`title-3 flex w-full cursor-pointer flex-row items-center justify-center rounded-lg px-10 py-5 ${config.bgColor}`}
      onClick={onClick}
    >
      <div className="mr-[10px] h-6 w-6">
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
  );
}
