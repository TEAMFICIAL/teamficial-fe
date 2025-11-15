import Button from '@/components/common/button/Button';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import ProfileLinkButton from './ProfileLinkButton';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  profile: ResponseProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between px-8">
      <div className="flex gap-7">
        <Image
          src={profile.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={100}
          height={100}
          className="h-[100px] w-[100px] self-start rounded-full"
        />
        <div className="flex flex-col">
          <p className="body-1 mb-2 text-gray-900">{profile.userName}님</p>
          <div className="flex items-center gap-2">
            <p className="body-5 text-gray-800">연락수단</p>
            <div className="h-3 w-[1px] bg-gray-700"></div>
            <p className="body-6 text-gray-600">{profile.contactWay}</p>
          </div>
          <div className="mb-5 flex items-center gap-2">
            <p className="body-5 text-gray-800">작업시간</p>
            <div className="h-3 w-[1px] bg-gray-700"></div>
            <p className="body-6 text-gray-600">{profile.workingTime}에 작업하는게 편해요</p>
          </div>
          {profile.headKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.headKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="body-7 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-600"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          ) : (
            <Button
              onClick={() => router.push('/teampsylog')}
              className="border-primary-100 bg-primary-50 body-7 text-primary-900 mt-2 border px-4 py-2"
            >
              팀피셜록에서 대표 키워드 설정하러가기
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-end gap-4">
          <div className="flex gap-4 self-end">
            {profile.links &&
              profile.links.length > 0 &&
              profile.links.map((link, index) => <ProfileLinkButton key={index} link={link} />)}
          </div>
        </div>
        {profile.headKeywords.length > 0 && (
          <Button
            onClick={() => router.push('/teampsylog')}
            className="bg-primary-900 text-gray-0 body-3 px-4 py-2"
          >
            전체 키워드 보기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
