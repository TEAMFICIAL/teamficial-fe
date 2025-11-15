import Image from 'next/image';

interface ErrorProps {
  message?: string;
}

const Error = ({ message = '앗! 에러가 발생했어요' }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10">
      <Image
        src={`/icons/404.svg`}
        alt="symbol"
        width={170}
        height={70}
        className="flex flex-col"
      />
      <p className="title-3 text-gray-800">{message}</p>
    </div>
  );
};

export default Error;
