import LineButton from '@/components/common/button/LineButton';

const Banner = () => {
  return (
    <main className="flex h-[235px] flex-col gap-10 rounded-2xl bg-gray-200 p-10">
      <p className="title-2">
        팀피셜록에서 얻은 키워드로
        <br />
        프로젝트를 함께 할 동료를 찾아보세요
      </p>
      <LineButton>팀피셜록 요청하기 →</LineButton>
    </main>
  );
};

export default Banner;
