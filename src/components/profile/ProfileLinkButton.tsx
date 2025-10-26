'use client';
import Image from 'next/image';
import React from 'react';

type LinkButtonProps = {
  type: 'behance' | 'github' | 'notion';
  link?: string;
};

const ProfileLinkButton = ({ type, link }: LinkButtonProps) => {
  return (
    <button
      aria-label="프로필 버튼"
      disabled={!link}
      className="h-7 w-7 cursor-pointer"
      onClick={() => link && window.open(link, '_blank')}
    >
      <Image src={`/icons/${type}.svg`} alt={type} width={28} height={28} />
    </button>
  );
};

export default ProfileLinkButton;
