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
      className={`desktop:body-5 body-9 desktop:px-5 desktop:py-3 box-border rounded-lg px-3 py-2 transition-all ${
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
