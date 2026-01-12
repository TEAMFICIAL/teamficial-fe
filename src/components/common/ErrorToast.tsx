import Image from 'next/image';

export default function ErrorToast({ title, message }: { title?: string; message: string }) {
  return (
    <>
      <div className="tablet:flex body-5 bg-red-10 hidden gap-4 rounded-lg px-8 py-4 text-center text-red-200">
        <Image src={'/icons/toast-error.svg'} alt="error" width={54} height={54} />
        <div className="flex flex-col text-start">
          <div className="title-3">{title}</div>
          <div className="body-6">{message}</div>
        </div>
      </div>
      <div className="tablet:hidden bg-red-10 flex gap-1 rounded-lg px-5 py-3 text-red-200">
        <Image src={'/icons/toast-error.svg'} alt="error" width={32} height={32} />
        <div className="flex flex-col text-start">
          <div className="body-7">{title}</div>
          <div className="body-10">{message}</div>
        </div>
      </div>
    </>
  );
}
