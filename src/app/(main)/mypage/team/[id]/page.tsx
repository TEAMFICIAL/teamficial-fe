'use client';

import { useState } from 'react';
import TeamMemberList from './_components/TeamMemberList';
import TeamTitle from './_components/TeamTitle';
import { useParams } from 'next/navigation';

const Page = () => {
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const postId = Number(id);

  return (
    <>
      <TeamTitle teamMemberStatus={status} setTeamMemberStatus={setStatus} />
      <TeamMemberList postId={postId} position={status} />
    </>
  );
};

export default Page;
