import React from 'react';

type TagProps = {
  children: string;
};

const ProfileTag = ({ children }: TagProps) => {
  return (
    <span className="desktop:body-7 body-8 bg-gray-0 desktop:px-4 desktop:py-2 rounded-lg border border-gray-300 px-2 py-1 text-gray-600">
      #{children}
    </span>
  );
};

export default ProfileTag;
