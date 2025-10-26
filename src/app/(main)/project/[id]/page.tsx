import React from 'react';
import ProjectInfo from './_components/ProjectInfo';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <>
      <ProjectInfo id={id} />
    </>
  );
};

export default page;
