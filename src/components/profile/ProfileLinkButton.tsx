'use client';
import { getLinkType } from '@/utils/project/linkType';
import Image from 'next/image';
import React from 'react';

const ProfileLinkButton = ({ link }: { link: string }) => {
  const type = getLinkType(link);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (!isValidUrl(link)) {
    return null;
  }

  return (
    <button
      aria-label={`${type} 링크`}
      className="h-7 w-7 cursor-pointer"
      onClick={() => {
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      }}
      title={link}
    >
      <Image
        src={`/icons/${type === 'other' ? 'etclink' : type}.svg`}
        alt={type}
        width={28}
        height={28}
      />
    </button>
  );
};

export default ProfileLinkButton;
