import Button from '@/components/common/button/Button';
import Image from 'next/image';

interface Profile {
  id: number;
  name: string;
  contact: string;
  workTime: string;
  keywords: string[];
}

interface ProfileCardProps {
  profile: Profile;
}

const Profile = ({ profile }: ProfileCardProps) => {
  return (
    <div className="mb-10 flex justify-between gap-8 rounded-lg border border-gray-300 p-8">
      <div className="flex items-start gap-4">
        <Image src="/icons/profile.svg" alt="profile" width={90} height={90} />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="body-1">{profile.name}</p>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">연락 수단</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">{profile.contact}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">{profile.workTime}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="body-7 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-600"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-end gap-4">
          {['behance', 'github', 'notion'].map((icon) => (
            <Image
              key={icon}
              src={`/icons/${icon}.svg`}
              alt={icon}
              width={24}
              height={24}
              className="cursor-pointer"
            />
          ))}
        </div>
        <Button className="bg-primary-900 body-5 text-gray-0 px-4 py-2">전체 키워드 보기</Button>
      </div>
    </div>
  );
};

export default Profile;
