'use client';
import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import ProjectTitle from './ProjectTitle';
import InfoCard from './InfoCard';
import Profile1 from '@/components/profile/Profile1';
import { useGetProject } from '@/hooks/queries/useProject';

const ProjectInfo = ({ id }: { id: string }) => {
  const { data } = useGetProject({ postId: Number(id) });
  if (!data) return null;

  const sanitizedContent = DOMPurify.sanitize(data.content);

  return (
    <>
      <ProjectTitle {...data} />
      <div className="mb-14 flex flex-col gap-4">
        <InfoCard {...data} />
        <div className="prose max-w-none rounded-2xl border border-gray-300 p-10 text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
        <Profile1 profileId={data.writerProfileId} />
      </div>
    </>
  );
};

export default ProjectInfo;
