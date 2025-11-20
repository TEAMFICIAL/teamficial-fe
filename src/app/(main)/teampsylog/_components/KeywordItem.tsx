import React from 'react';

const KeywordItem = ({ keyword }: { keyword: string }) => {
  return (
    <div className="body-5 rounded-lg border border-gray-300 bg-gray-50 px-5 py-3 text-gray-800">
      #{keyword}
    </div>
  );
};

export default KeywordItem;
