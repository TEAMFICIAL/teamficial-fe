import Button from '@/components/common/button/Button';
import Image from 'next/image';

interface Profile {
  id: number;
  name: string;
  avatar?: string;
  contact: string;
  workTime: string;
  keywords: string[];
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="flex w-full justify-between px-8">
      <div className="flex gap-7">
        <Image
          src={profile.avatar || '/icons/initial-profile.svg'}
          alt="profile"
          width={100}
          height={100}
          className="self-start"
        />
        <div className="flex flex-col">
          <p className="body-1 mb-2 text-gray-900">{profile.name}님</p>
          <div className="flex items-center gap-2">
            <p className="body-5 text-gray-800">연락수단</p>
            <div className="h-3 w-[1px] bg-gray-700"></div>
            <p className="body-6 text-gray-600">{profile.contact}</p>
          </div>
          <div className="mb-5 flex items-center gap-2">
            <p className="body-5 text-gray-800">작업시간</p>
            <div className="h-3 w-[1px] bg-gray-700"></div>
            <p className="body-6 text-gray-600">{profile.workTime}</p>
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
        <Button disabled className="bg-primary-900 text-gray-0 px-4 py-2">
          전체 키워드 보기
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
