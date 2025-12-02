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
      className={`body-5 box-border rounded-lg px-5 py-3 transition-all ${
        isEditMode && isSelected && isPlaceholder
          ? 'border-primary-900 bg-primary-50 text-primary-900 cursor-pointer border-2 border-dashed'
          : isEditMode && isSelected
            ? 'border-primary-900 bg-primary-50 text-primary-900 cursor-pointer border'
            : isEditMode && isPlaceholder
              ? 'cursor-pointer border-2 border-dashed border-gray-400 bg-gray-50 text-gray-600'
              : isEditMode
                ? 'cursor-pointer border border-gray-300 bg-gray-50 text-gray-800'
                : `border border-gray-300 bg-gray-50 ${isPlaceholder ? 'text-gray-600' : 'text-gray-800'}`
      } `}
    >
      #{keyword}
    </div>
  );
};

export default KeywordItem;
