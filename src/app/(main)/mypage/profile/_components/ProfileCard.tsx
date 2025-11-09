import Button from '@/components/common/button/Button';
import { Keyword } from '@/components/common/Tag';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileCard = () => {
  const { userName } = useUserStore();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mypage/profile/edit/1`);
  };
  return (
    <div>
      <div className="body-6 mb-3 flex w-full justify-between text-gray-700">
        <p className="cursor-pointer">새 프로필</p>
        <button onClick={handleClick} className="cursor-pointer">
          수정하기
        </button>
      </div>
      <div className="flex w-full justify-between rounded-2xl border border-gray-300 px-14 py-8">
        <div className="flex gap-7">
          <Image
            src="/icons/initial-profile.svg"
            className="self-start"
            alt="profile"
            width={100}
            height={100}
          />
          <div className="flex flex-col">
            <p className="body-1 mb-2 text-gray-900">{userName}</p>
            <div className="flex items-center gap-2">
              <p className="body-5 text-gray-800">연락수단</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-600">연락수단을 등록해주세요</p>
            </div>
            <div className="flex items-center gap-2 pb-5">
              <p className="body-5 text-gray-800">작업시간</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-600">작업시간대를 선택해주세요</p>
            </div>
            <div className="body-7 flex gap-2">
              <Keyword className="border border-gray-300 bg-gray-200 px-4 py-2 text-gray-600">
                #키워드1
              </Keyword>
              <Keyword className="border border-gray-300 bg-gray-200 px-4 py-2 text-gray-600">
                #키워드2
              </Keyword>
              <Keyword className="border border-gray-300 bg-gray-200 px-4 py-2 text-gray-600">
                #키워드3
              </Keyword>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex justify-end gap-4">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Image
                  key={i}
                  src="/icons/empty-link.svg"
                  className="self-start"
                  alt="link"
                  width={28}
                  height={28}
                />
              ))}
          </div>
          <Button className="bg-primary-900 body-3 text-gray-0 body-3 px-6 py-3">
            전체 키워드보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
