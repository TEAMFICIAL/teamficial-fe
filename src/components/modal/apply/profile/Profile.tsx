import ProfileLinkButton from '@/app/(main)/mypage/_components/profile/ProfileLinkButton';
import Button from '@/components/common/button/Button';
import ProfileTag from '@/components/profile/ProfileTag';
import { ApplicationResponse } from '@/types/application';
import Image from 'next/image';

interface ProfileCardProps {
  profile: ApplicationResponse;
}

const Profile = ({ profile }: ProfileCardProps) => {
  return (
    <div className="mb-10 flex justify-between gap-1 rounded-lg border border-gray-300 p-8">
      <div className="flex items-start gap-4">
        <Image
          src={profile.profile.profileImageUrl || '/icons/profile.svg'}
          className="h-[90px] w-[90px] rounded-full object-cover"
          alt="profile"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="body-1">{profile.profile.userName}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">연락수단</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">팀원이 되면 공개해요</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">
                  {profile.profile.workingTime
                    ? `${profile.profile.workingTime}에 작업하는 게 편해요`
                    : '작업시간을 등록하지 않았어요'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.profile.headKeywords.map((keyword) => (
              <ProfileTag key={keyword}>{keyword}</ProfileTag>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-end gap-4">
          {profile.profile.links &&
            profile.profile.links.length > 0 &&
            profile.profile.links.map((link, index) => (
              <ProfileLinkButton key={index} link={link} />
            ))}
        </div>
        <Button
          className="bg-primary-900 body-5 text-gray-0 px-4 py-2"
          onClick={() => {
            window.open(`/teampsylog/${profile.profile.uuid}`, '_blank');
          }}
        >
          전체 키워드 보기
        </Button>
      </div>
    </div>
  );
};

export default Profile;
