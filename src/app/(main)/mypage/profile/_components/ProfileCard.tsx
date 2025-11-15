import Button from '@/components/common/button/Button';
import { ResponseProfile } from '@/types/profile';
import { useRouter } from 'next/navigation';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileLinks from './ProfileLinks';
import { useModal } from '@/contexts/ModalContext';

interface ProfileCardProps {
  profile?: ResponseProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const router = useRouter();
  const { openModal } = useModal();

  const handleEdit = () => {
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

  return (
    <div>
      <ProfileHeader
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        title={profile?.profileName}
      />
      <div className="flex w-full justify-between rounded-2xl border border-gray-300 px-14 py-8">
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
