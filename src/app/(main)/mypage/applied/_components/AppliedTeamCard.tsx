'use client';

import { Tag } from '@/components/common/Tag';
import { Application } from '@/types/applicant';
import { formatDateDot } from '@/utils/project/formatDate';
import { getStatusColor } from '@/utils/project/getStatusColor';
import { useRouter } from 'next/navigation';

interface AppliedTeamCardProps {
  applicant: Application;
  index: number;
}

const AppliedTeamCard = ({ applicant, index }: AppliedTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${applicant.recruitingPostId}`);
  };

  return (
    <>
      <div className="tablet:hidden">
        <button
          onClick={handleClick}
          className="tablet:hidden bg-gray-0 flex w-full flex-col gap-2 rounded-2xl border border-gray-300 px-5 py-4"
        >
          <div className="flex w-full justify-between">
            <div className="flex gap-1">
              <Tag className="body-9 bg-gray-200 text-gray-700">{applicant.period}</Tag>
              <Tag className="body-9 bg-gray-200 text-gray-700">{applicant.progressWay}</Tag>
            </div>
            <Tag className={`body-9 ${getStatusColor(applicant.status)}`}>{applicant.status}</Tag>
          </div>
          <div>
            <p className="body-5 flex items-start truncate text-gray-900">{applicant.title}</p>
            <p className="body-9 flex items-start text-gray-600">#{applicant.tags.join(' #')}</p>
          </div>
        </button>
      </div>
      <button
        onClick={handleClick}
        className="tablet:flex hidden cursor-pointer border-b border-gray-300 py-6"
      >
        <p className="body-6 flex w-25 items-center justify-center text-center text-gray-700">
          {index}
        </p>
        <div className="flex w-150.75 flex-col items-start gap-2">
          <div className="flex gap-1">
            <Tag className="bg-gray-200 text-gray-700">{applicant.period}</Tag>
            <Tag className="bg-gray-200 text-gray-700">{applicant.progressWay}</Tag>
          </div>
          <p className="title-3 flex items-start text-gray-900">{applicant.title}</p>
          <p className="body-8 text-gray-600">#{applicant.tags.join(' #')}</p>
        </div>
        <div className="flex w-30 items-center justify-center">
          <Tag className={getStatusColor(applicant.status)}>{applicant.status}</Tag>
        </div>
        <p className="body-8 flex w-30.25 items-center justify-center text-gray-700">
          {formatDateDot(applicant.createdAt)}
        </p>
      </button>
    </>
  );
};

export default AppliedTeamCard;
