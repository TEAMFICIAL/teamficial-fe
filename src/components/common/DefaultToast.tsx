export default function DefaultToast({ message }: { message: string }) {
  return (
    <div className="body-5 max-w-[383px] rounded-[58px] bg-gray-700 px-8 py-4 text-center text-white shadow">
      {message}
    </div>
  );
}
