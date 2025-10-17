import LoginSocialList from '@/components/login/LoginSocialList';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-[480px] flex-col items-center justify-center gap-20">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center gap-2">
          <Image src="/icons/teamficial-symbol.svg" alt="logo" width={70.0826} height={70.0829} />
          <Image src="/icons/teamficial-logo.svg" alt="logo" width={165.9005} height={55.3193} />
        </div>
        <p className="title-1 flex text-center">
          함께의 시작을 부드럽게.
          <br />
          자연스러운 연결로 시작되는 팀빌딩
        </p>
      </div>
      <LoginSocialList />
    </main>
  );
}
