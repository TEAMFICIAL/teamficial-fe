import Button from '@/components/common/button/Button';
import { ResponseProfile } from '@/types/profile';
import { useRouter } from 'next/navigation';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileLinks from './ProfileLinks';
import { useModal } from '@/contexts/ModalContext';
import Link from 'next/link';
import Image from 'next/image';

interface ProfileCardProps {
  profile?: ResponseProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();
  const { openModal } = useModal();

  const handleEdit = () => {
    if (!profile) return;
    router.push(`/mypage/profile/edit/${profile?.profileId}`);
  };

  const handleKeywords = () => {
    router.push('/teampsylog');
  };

  const handleDelete = () => {
    if (!profile) return;
    openModal('profileDelete', {
      profileId: profile.profileId,
      profileName: profile.profileName,
    });
  };

  const handleClickDetail = () => {
    if (!profile) return;
    openModal('profileDetail', { profile });
  };

  return (
    <div>
      <ProfileHeader
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        title={profile?.profileName}
      />
      <div className="tablet:hidden">
        <div className="bg-gray-0 flex flex-col justify-between rounded-2xl border border-gray-300">
          <div className="flex flex-col gap-1.5 px-5 py-4">
            <p className="flex items-center gap-1">
              <Image
                src={profile?.profileImageUrl || '/icons/profile.svg'}
                alt="profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="body-7 text-gray-900">{profile?.userName}님</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {profile?.headKeywords && profile?.headKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {profile?.headKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="body-10 bg-gray-0 rounded-lg border border-gray-300 px-2 py-1 text-gray-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <Button
                  onClick={() => router.push('/teampsylog')}
                  className="border-primary-100 bg-primary-50 body-10 text-primary-900 border px-2 py-1 whitespace-nowrap"
                >
                  팀피셜록에서 대표 키워드 설정하러가기
                </Button>
              )}
            </div>
          </div>
          <div className="body-7 flex border-t border-gray-300 text-gray-800">
            <button className="flex-1 py-3" onClick={handleClickDetail}>
              상세보기
            </button>
            <div className="w-[1px] bg-gray-300"></div>
            <Link href={`/teampsylog/${profile?.uuid}`} className="flex-1 py-3 text-center">
              전체 키워드 보기
            </Link>
          </div>
        </div>
      </div>
      <div className="tablet:flex hidden w-full justify-between rounded-2xl border border-gray-300 px-14 py-8">
        <div className="flex flex-col">
          <ProfileInfo profile={profile} />
        </div>
        <div className="flex flex-col items-end justify-between">
          <ProfileLinks links={profile?.links} />
          <Button onClick={handleKeywords} className="bg-primary-900 body-3 text-gray-0 px-6 py-3">
            전체 키워드보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
