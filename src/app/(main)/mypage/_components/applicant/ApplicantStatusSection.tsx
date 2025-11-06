'use client';

import { MyRecruitingPost } from '@/types/project';
import ApplicantStatusCard from './ApplicantStatusCard';

interface ApplicantStatusSectionProps {
  recruitings: MyRecruitingPost[];
}

const ApplicantStatusSection = ({ recruitings }: ApplicantStatusSectionProps) => {
  return (
    <div className="mb-14">
      <div className="flex w-full justify-between py-5">
        <p className="title-2 text-gray-900">지원자 현황</p>
        <button
          type="button"
          className="body-6 cursor-pointer self-end text-gray-700"
          onClick={() => {}}
        >
          전체보기
        </button>
      </div>
      <div className="flex gap-4">
        {recruitings.map((post) => (
          <ApplicantStatusCard key={post.recruitingPostId} recruiting={post} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantStatusSection;
