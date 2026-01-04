import { Tag } from '@/components/common/Tag';
import { MyApplication } from '@/types/project';
import Image from 'next/image';
import { formatDateDot } from '@/utils/project/formatDate';
import { useRouter } from 'next/navigation';
import { getStatusColor } from '@/utils/project/getStatusColor';

interface AppliedTeamCardProps {
  application: MyApplication;
}

const AppliedTeamCard = ({ application }: AppliedTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${application.recruitingPostId}`);
  };

  const profileSrc = application.profileImage ? application.profileImage : '/icons/profile.svg';

  return (
    <div
      onClick={handleClick}
      className="tablet:p-5 tablet:w-76 flex w-full cursor-pointer flex-col rounded-2xl border border-gray-300 px-5 py-4"
    >
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-1">
          <Tag className="bg-gray-200 text-gray-700">{application.period}</Tag>
          <Tag className="bg-gray-200 text-gray-700">{application.progressWay}</Tag>
        </div>
        <Tag className={getStatusColor(application.status)}>{application.status}</Tag>
      </div>
      <p className="tablet:title-3 body-5 max-w-[248px] truncate text-gray-900">
        {application.title}
      </p>
      <div className="tablet:body-8 body-9 tablet:mb-5 mb-3 flex max-w-[248px] gap-1 overflow-hidden text-gray-600">
        {application.tags.map((tag) => (
          <p key={tag} className="truncate">
            #{tag}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image
            src={profileSrc}
            alt="profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="tablet:body-8 body-10 text-gray-700">{application.writerName}</span>
        </div>
        <span className="tablet:body-8 body-10 text-gray-700">
          {formatDateDot(application.deadline)}
        </span>
      </div>
    </div>
  );
};

export default AppliedTeamCard;
