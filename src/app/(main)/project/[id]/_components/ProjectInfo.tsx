'use client';
import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import ProjectTitle from './ProjectTitle';
import InfoCard from './InfoCard';
import Profile1 from '@/components/profile/Profile1';
import { useGetProject } from '@/hooks/queries/useProject';

const ProjectInfo = ({ id }: { id: string }) => {
  const { data } = useGetProject(
    { postId: Number(id) },
    { refetchOnMount: true, refetchOnWindowFocus: true },
  );
  if (!data) return null;

  const sanitizedContent = DOMPurify.sanitize(data.content.replace(/<p><\/p>/g, '<p><br /></p>'));
  const isWriter = data.writer;

  return (
    <div
      className={
        `desktop:bg-gray-0 desktop:pb-14 desktop:mb-0 mx-[-16px] min-h-[calc(100vh-72px)] bg-gray-100 px-4 pb-5 ` +
        (!isWriter ? 'mb-22' : '')
      }
    >
      <ProjectTitle {...data} />
      <div className="desktop:gap-4 flex flex-col gap-3">
        <InfoCard {...data} />
        <div className="prose desktop:bg-none bg-gray-0 desktop:p-10 max-w-none rounded-2xl border border-gray-300 px-5 py-6 text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
        <Profile1 profileId={data.writerProfileId} />
      </div>
    </div>
  );
};

export default ProjectInfo;
