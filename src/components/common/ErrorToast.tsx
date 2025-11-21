import Image from 'next/image';

export default function ErrorToast({ title, message }: { title?: string; message: string }) {
  return (
    <div className="body-5 bg-red-10 flex w-[685px] gap-4 rounded-lg px-8 py-4 text-center text-red-200">
      <Image src={'/icons/toast-error.svg'} alt="error" width={54} height={54} />
      <div className="flex flex-col text-start">
        <div className="title-3">{title}</div>
        <div className="body-6">{message}</div>
      </div>
    </div>
  );
}
