'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import KeywordPage from '../../_components/KeywordPage';

const KeywordListPage = () => {
  const params = useParams();
  const uuid = String(params.uuid);

  return (
    <>
      <KeywordPage uuid={uuid} />
    </>
  );
};

export default KeywordListPage;
