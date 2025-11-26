'use client';

import { useState } from 'react';
import TeamMemberList from './_components/TeamMemberList';
import TeamTitle from './_components/TeamTitle';
import { useParams } from 'next/navigation';
import ErrorDisplay from '@/components/common/Error';

const Page = () => {
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const postId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(postId)) {
    return <ErrorDisplay />;
  }

  return (
    <>
      <TeamTitle teamMemberStatus={status} setTeamMemberStatus={setStatus} />
      <TeamMemberList postId={postId} position={status} />
    </>
  );
};

export default Page;
