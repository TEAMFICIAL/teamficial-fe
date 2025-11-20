import React from 'react';

type TagProps = {
  children: string;
};

const ProfileTag = ({ children }: TagProps) => {
  return (
    <span className="body-7 bg-gray-0 rounded-lg border border-gray-300 px-4 py-2 text-gray-600">
      #{children}
    </span>
  );
};

export default ProfileTag;
