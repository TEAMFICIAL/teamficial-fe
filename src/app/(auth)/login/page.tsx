import LoginSocialList from '@/components/login/LoginSocialList';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="tablet:gap-10 mx-auto flex min-h-screen max-w-[400px] flex-col items-center justify-center gap-3 px-4">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/icons/teamficial-login.svg"
          alt="logo"
          width={250}
          height={72}
          className="tablet:w-[250px] tablet:h-[72px] h-[45px] w-[160px]"
        />
      </div>
      <p className="tablet:title-2 body-7 flex text-center text-[#4B4B4B]">
        함께의 시작을 부드럽게.
        <br />
        자연스러운 연결로 시작되는 팀빌딩
      </p>
      <LoginSocialList />
    </main>
  );
}
