'use client';

import { useState } from 'react';
import TeamMemberList from './_components/TeamMemberList';
import TeamTitle from './_components/TeamTitle';
import { useParams } from 'next/navigation';
import ErrorDisplay from '@/components/common/Error';
import MobileHeader from '@/components/common/MobileHeader';

const Page = () => {
  const [status, setStatus] = useState('');
  const { id } = useParams();
  const postId = Array.isArray(id) ? Number(id[0]) : Number(id);
  if (isNaN(postId)) {
    return <ErrorDisplay />;
  }

  return (
    <>
      <MobileHeader title="참여중인 팀" />
      <div className="tablet:bg-transparent -mx-4 h-full bg-gray-100">
        <TeamTitle teamMemberStatus={status} setTeamMemberStatus={setStatus} />
        <TeamMemberList postId={postId} position={status} />
      </div>
    </>
  );
};

export default Page;
