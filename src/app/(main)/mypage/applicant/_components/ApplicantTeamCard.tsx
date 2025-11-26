'use client';

import { Tag } from '@/components/common/Tag';
import { CurrentApplicant } from '@/types/applicant';
import { formatDday } from '@/utils/project/formatDate';
import { useRouter } from 'next/navigation';

interface ApplicantTeamCardProps {
  application: CurrentApplicant;
  index: number;
}

const ApplicantTeamCard = ({ application, index }: ApplicantTeamCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (application.recruitingPostStatus === '모집 마감') {
      router.push(`/project/${application.recruitingPostId}`);
    } else {
      router.push(`/project/${application.recruitingPostId}/applicants`);
    }
  };

  return (
    <button onClick={handleClick} className="flex cursor-pointer border-b border-gray-300 py-6">
      <p className="body-6 flex w-25 items-center justify-center text-center text-gray-700">
        {index}
      </p>
      <div className="flex w-153 flex-col items-start gap-2">
        <div className="flex gap-1">
          <Tag className="bg-primary-50 border-primary-900 text-primary-900 border">
            현재 {application.totalApplicants}명이 지원했어요
          </Tag>
        </div>
        <p className="title-3 flex w-144.75 items-start text-gray-900">{application.title}</p>
        <p className="body-8 text-gray-600">#{application.tags.join(' #')}</p>
      </div>
      <div className="flex w-58 items-center justify-center">
        <Tag className="bg-red-10 text-red-100">
          {application.recruitingPostStatus === '모집 마감' ? '마감' : formatDday(application.dday)}
        </Tag>
      </div>
    </button>
  );
};

export default ApplicantTeamCard;
