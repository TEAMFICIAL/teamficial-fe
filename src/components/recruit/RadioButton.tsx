import Image from 'next/image';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
}

import React from 'react';

const RadioButton = ({ id, name, value, checked, label, onChange }: RadioButtonProps) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        className="hidden"
        checked={checked}
        onChange={() => onChange(value)}
      />
      <label
        htmlFor={id}
        className="desktop:body-5 body-7 desktop:gap-3 flex cursor-pointer items-center gap-2 text-gray-800"
      >
        <Image
          src={checked ? '/icons/radio-selected.svg' : '/icons/radio-unselected.svg'}
          alt={checked ? 'selected' : 'unselected'}
          width={28}
          height={28}
          className="desktop:w-7 desktop:h-7 h-6 w-6"
        />
        {label}
      </label>
    </>
  );
};

export default RadioButton;
