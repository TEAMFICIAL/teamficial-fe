import React from 'react';

type InfoItemProps = {
  label: string;
  value: string;
  className?: string;
};

const InfoItem = ({ label, value, className = '' }: InfoItemProps) => {
  const isUrl = /^(https?:\/\/|www\.)/i.test(value);

  return (
    <div className={`flex items-center ${className}`}>
      <p className="body-3 w-30 flex-shrink-0">{label}</p>
      <div className="min-w-0 flex-1">
        {isUrl ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="body-4 text-primary-900 line-clamp-1 break-all underline"
            title={value}
          >
            {value}
          </a>
        ) : (
          <p className="body-4 line-clamp-2 break-all text-gray-700" title={value}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoItem;
