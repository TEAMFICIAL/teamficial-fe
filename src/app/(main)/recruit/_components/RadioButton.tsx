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
      <label htmlFor={id} className="body-5 flex cursor-pointer items-center gap-3 text-gray-800">
        <Image
          src={checked ? '/icons/radio-selected.svg' : '/icons/radio-unselected.svg'}
          alt={checked ? 'selected' : 'unselected'}
          width={28}
          height={28}
        />
        {label}
      </label>
    </>
  );
};

export default RadioButton;
