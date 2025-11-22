import { Tag } from '@/components/common/Tag';
import { MyRecruitingPost } from '@/types/project';
import { formatDday } from '@/utils/project/formatDate';
import { useRouter } from 'next/navigation';

interface ApplicantStatusCardProps {
  recruiting: MyRecruitingPost;
}

const ApplicantStatusCard = ({ recruiting }: ApplicantStatusCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${recruiting.recruitingPostId}/applicants`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-0 w-76 cursor-pointer rounded-2xl border border-gray-300 p-5"
    >
      <div className="mb-2.5 flex justify-between">
        <Tag className="bg-primary-50 border-primary-900 text-primary-900 border">
          현재 {recruiting.totalApplicants}명이 지원했어요
        </Tag>
        <Tag className="bg-red-10 text-red-100">
          {recruiting.recruitingPostStatus === '모집 마감' ? '마감' : formatDday(recruiting.dday)}
        </Tag>
      </div>
      <p className="title-3 truncate text-gray-900">{recruiting.title}</p>
      <div className="body-8 flex gap-1 text-gray-600">
        {recruiting.tags.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default ApplicantStatusCard;
