import React from 'react';
import KeywordListPage from './_components/KeywordListPage';
import MobileHeader from '@/components/common/MobileHeader';

const page = () => {
  return (
    <>
      <MobileHeader title="팀피셜록" />
      <KeywordListPage />
    </>
  );
};

export default page;
