import React from 'react';

type TagProps = {
  children: string;
  maxLength?: number;
};

import { useState } from 'react';

const ProfileTag = ({ children, maxLength }: TagProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const limit = typeof maxLength === 'number' ? maxLength : 7;
  const isTruncated = children.length > limit;
  const displayText = isTruncated ? children.slice(0, limit) + '...' : children;

  return (
    <>
      <span
        className="body-9 bg-gray-0 desktop:px-4 desktop:py-2 relative cursor-default rounded-lg border border-gray-300 px-2 py-1 text-gray-600"
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        #{displayText}
      </span>
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            left: 16,
            bottom: 16,
            background: 'rgba(60,60,60,0.95)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          #{children}
        </div>
      )}
    </>
  );
};

export default ProfileTag;
