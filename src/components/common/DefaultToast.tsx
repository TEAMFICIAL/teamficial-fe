export default function DefaultToast({ message }: { message: string }) {
  return (
    <div className="desktop:body-5 body-7 desktop:bg-gray-700 bg-gray-0 desktop:px-8 desktop:py-4 desktop:text-gray-0 max-w-[383px] rounded-[58px] px-7 py-3 text-center text-gray-700 shadow">
      {message}
    </div>
  );
}
