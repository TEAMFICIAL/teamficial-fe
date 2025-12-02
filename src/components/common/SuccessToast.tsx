export default function SuccessToast({ message }: { message: string }) {
  return (
    <div className="body-5 w-[383px] rounded-[58px] bg-green-500 px-8 py-4 text-center text-white shadow-lg">
      {message}
    </div>
  );
}
