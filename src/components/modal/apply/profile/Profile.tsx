import ProfileLinkButton from '@/app/(main)/mypage/_components/profile/ProfileLinkButton';
import Button from '@/components/common/button/Button';
import { ApplicationResponse } from '@/types/application';
import Image from 'next/image';

interface ProfileCardProps {
  profile: ApplicationResponse;
}

const Profile = ({ profile }: ProfileCardProps) => {
  console.log('Profile component - received profile:', profile);

  return (
    <div className="mb-10 flex justify-between gap-8 rounded-lg border border-gray-300 p-8">
      <div className="flex items-start gap-4">
        <Image
          src={profile.profile.profileImageUrl || '/icons/profile.svg'}
          alt="profile"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="body-1">{profile.profile.userName}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">연락 수단</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">{profile.profile.contactWay}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="body-5 text-gray-800">작업시간</p>
                <div className="h-3 w-[1px] bg-gray-700" />
                <p className="body-6 text-gray-700">
                  {profile.profile.workingTime}에 작업하는 게 편해요
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* 백엔드 수정 후 반영 예정 */}
            {/* {profile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="body-7 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-600"
              >
                #{keyword}
              </span>
            ))} */}
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
        <Button className="bg-primary-900 text-gray-0 px-4 py-2">전체 키워드 보기</Button>
      </div>
    </div>
  );
};

export default Profile;
