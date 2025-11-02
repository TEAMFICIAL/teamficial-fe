'use client';
import { getLinkType } from '@/utils/project/linkType';
import Image from 'next/image';
import React from 'react';

const ProfileLinkButton = ({ link }: { link: string }) => {
  const type = getLinkType(link);

  return (
    <button
      aria-label={`${type} 링크`}
      className="h-7 w-7 cursor-pointer"
      onClick={() => window.open(link, '_blank')}
      title={link}
    >
      <Image
        src={`/icons/${type === 'other' ? 'plus' : type}.svg`}
        alt={type}
        width={28}
        height={28}
      />
    </button>
  );
};

export default ProfileLinkButton;
