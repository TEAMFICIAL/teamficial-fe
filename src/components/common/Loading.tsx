import Image from 'next/image';

const Loading = () => {
  return (
    <div className="bg-gray-0/40 fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="bg-gray-0 flex h-[202px] max-w-[576px] flex-col items-center justify-center gap-3 rounded-2xl p-10 text-center shadow-sm">
        <Image
          src={`/icons/gray_teamficial_symbol.svg`}
          alt="symbol"
          width={56}
          height={56}
          className="flex flex-col"
        />
        <div>
          <p className="title-3 text-gray-800">로딩 중</p>
          <p className="body-6 text-gray-700">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
