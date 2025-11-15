import React from 'react';

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
};

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 select-none">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
        role="switch"
      />

      <span
        className={[
          'relative inline-flex h-6 w-[42px] items-center rounded-full px-1 transition-all',
          'justify-start peer-checked:justify-end',
          'bg-gray-400 peer-checked:bg-gray-700',
          'peer-focus-visible:outline-primary-300 peer-focus-visible:outline peer-focus-visible:outline-2',
        ].join(' ')}
      >
        <span className="h-4 w-4 rounded-full bg-gray-50" />
      </span>

      {label && <span className="body-8 text-gray-800">{label}</span>}
    </label>
  );
};

export default Toggle;
