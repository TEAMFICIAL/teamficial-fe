import React from 'react';

const KeywordItem = ({
  keyword,
  isEditMode = false,
  isSelected = false,
  isPlaceholder = false,
  onClick,
}: {
  keyword: string;
  isEditMode?: boolean;
  isSelected?: boolean;
  isPlaceholder?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`body-5 rounded-lg border px-5 py-3 transition-all ${
        isEditMode && isSelected
          ? 'border-primary-900 bg-primary-50 text-primary-900 cursor-pointer'
          : isEditMode
            ? `cursor-pointer border-gray-300 bg-gray-50 hover:border-gray-400 ${
                isPlaceholder ? 'text-gray-600' : 'text-gray-800'
              }`
            : `border-gray-300 bg-gray-50 ${isPlaceholder ? 'text-gray-600' : 'text-gray-800'}`
      } `}
    >
      #{keyword}
    </div>
  );
};

export default KeywordItem;
