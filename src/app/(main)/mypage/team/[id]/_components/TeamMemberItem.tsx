import { ResponseConfirmedProfile } from '@/types/myteam';
import { ResponseProfile } from '@/types/profile';
import { WORKING_TIME_KR } from '@/constants/Translate';
import MemberProfile from './MemberProfile';
import MemberInfo from './MemberInfo';
import MemberLinks from './MemberLinks';
import Button from '@/components/common/button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';

interface TeamMemberItemProps {
  member: ResponseConfirmedProfile;
}

const TeamMemberItem = ({ member }: TeamMemberItemProps) => {
  const router = useRouter();
  const { openModal } = useModal();

  const handleOpenDetailModal = () => {
    // ResponseConfirmedProfile을 ResponseProfile 형태로 변환
    const profile: ResponseProfile = {
      profileId: 0,
      userId: 0,
      userName: member.userName,
      profileImageUrl: member.profileImage,
      profileName: member.profileName,
      position: member.position,
      workingTime: member.workingTime
        ? WORKING_TIME_KR[member.workingTime] || member.workingTime
        : '',
      links: member.links,
      contactWay: member.contactWay || '',
      headKeywords: member.keywords,
      createdAt: '',
      modifiedAt: '',
      uuid: member.uuid || '',
    };
    openModal('profileDetail', { profile });
  };

  return (
    <>
      <div className="tablet:hidden">
        <div className="bg-gray-0 flex flex-col justify-between rounded-2xl border border-gray-300">
          <div className="flex flex-col gap-1.5 px-5 py-4">
            <p className="flex items-center gap-1">
              <Image
                src={member.profileImage || '/icons/profile.svg'}
                alt="profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="body-7 text-gray-900">{member.userName}님</span>
            </p>
            {member.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {member.keywords.map((keyword) => (
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
          <div className="body-7 flex border-t border-gray-300 text-gray-800">
            <button className="flex-1 py-3" onClick={handleOpenDetailModal}>
              상세보기
            </button>
            <div className="w-[1px] bg-gray-300"></div>
            <Link href={`/teampsylog/${member.uuid}`} className="flex-1 py-3 text-center">
              전체 키워드 보기
            </Link>
          </div>
        </div>
      </div>
      <div className="tablet:flex bg-gray-0 hidden justify-between rounded-2xl border border-gray-300 px-14 py-8">
        <div className="flex gap-7">
          <MemberProfile member={member} />
          <MemberInfo member={member} />
        </div>
        <MemberLinks links={member.links} />
      </div>
    </>
  );
};

export default TeamMemberItem;
