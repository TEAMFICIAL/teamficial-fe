import React from 'react';

type ButtonSize = 'small' | 'large';
type ButtonVariant = 'primary' | 'red' | 'gray';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({
  label,
  onClick,
  size = 'large',
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-900 text-gray-0 hover:bg-primary-700',
    red: 'bg-red-100 text-gray-0 hover:bg-red-200',
    gray: 'bg-gray-300 text-gray-800 disabled:text-gray-600',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    small: 'body-5',
    large: 'body-3',
  };

  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-8 py-4 ${sizeStyles[size]} ${disabled ? disabledStyle : variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
