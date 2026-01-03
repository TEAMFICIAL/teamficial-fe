import Button from '@/components/common/button/Button';
import { ResponseProfile } from '@/types/profile';
import Image from 'next/image';
import ProfileLinkButton from './ProfileLinkButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfileCardProps {
  profile: ResponseProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();
  const handleClickDetail = () => {
    router.push(`/mypage/profile/edit/${profile.profileId}`);
  };

  return (
    <>
      <div className="tablet:hidden">
        <div className="bg-gray-0 flex flex-col justify-between rounded-2xl border border-gray-300">
          <div className="flex flex-col gap-1.5 px-5 py-4">
            <p className="flex items-center gap-1">
              <Image
                src={profile.profileImageUrl || '/icons/profile.svg'}
                alt="profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="body-7 text-gray-900">{profile.userName}님</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {profile.headKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="body-10 bg-gray-0 rounded-lg border border-gray-300 px-2 py-1 text-gray-600"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="body-7 flex border-t border-gray-300 text-gray-800">
            <button className="flex-1 py-3" onClick={handleClickDetail}>
              상세보기
            </button>
            <div className="w-[1px] bg-gray-300"></div>
            <Link href={`/teampsylog/${profile.uuid}`} className="flex-1 py-3 text-center">
              전체 키워드 보기
            </Link>
          </div>
        </div>
      </div>
      <div className="tablet:flex hidden w-full justify-between px-8">
        <div className="flex gap-7">
          <Image
            src={profile.profileImageUrl || '/icons/profile.svg'}
            alt="profile"
            width={100}
            height={100}
            className="h-25 w-25 self-start rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="body-1 mb-2 text-gray-900">{profile.userName}님</p>
            <div className="flex items-center gap-2">
              <p className="body-5 flex-shrink-0 whitespace-nowrap text-gray-800">연락수단</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 max-w-[316px] truncate text-gray-600">
                {profile.contactWay ?? '연락수단을 등록해주세요'}
              </p>
            </div>
            <div className="mb-5 flex items-center gap-2">
              <p className="body-5 text-gray-800">작업시간</p>
              <div className="h-3 w-[1px] bg-gray-700"></div>
              <p className="body-6 text-gray-600">
                {profile.workingTime
                  ? `${profile.workingTime}에 작업하는게 편해요`
                  : '작업시간대를 선택해주세요'}
              </p>
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
                className="border-primary-100 bg-primary-50 body-7 text-primary-900 w-[243px] border px-4 py-2 whitespace-nowrap"
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
    </>
  );
};

export default ProfileCard;
