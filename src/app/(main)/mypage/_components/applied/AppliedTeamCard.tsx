import Tag from '@/components/common/Tag';
import { MyApplication } from '@/types/project';
import Image from 'next/image';
import { formatDateDot } from '@/utils/project/formatDate';
import { useRouter } from 'next/navigation';

interface AppliedTeamCardProps {
  application: MyApplication;
}

const AppliedTeamCard = ({ application }: AppliedTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${application.recruitingPostId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '매칭중':
        return 'bg-blue-50 text-blue-200';
      case '매칭성공':
        return 'bg-gray-200 text-gray-700';
      case '매칭실패':
        return 'bg-red-10 text-red-100';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-76 cursor-pointer flex-col rounded-2xl border border-gray-300 p-5"
    >
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-1">
          <Tag className="bg-gray-200 text-gray-700">{application.period}</Tag>
          <Tag className="bg-gray-200 text-gray-700">{application.progressWay}</Tag>
        </div>
        <Tag className={getStatusColor(application.status)}>{application.status}</Tag>
      </div>
      <p className="title-3 text-gray-900">{application.title}</p>
      <div className="body-8 mb-5 flex gap-1 text-gray-600">
        {application.tags.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image src="/icons/profile.svg" alt="profile" width={32} height={32} />
          <span className="body-8 text-gray-700">{application.writerName}</span>
        </div>
        <span className="body-8 text-gray-700">{formatDateDot(application.deadline)}</span>
      </div>
    </div>
  );
};

export default AppliedTeamCard;
