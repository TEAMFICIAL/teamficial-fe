import { cn } from '@/utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, className, disabled, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn('body-5 cursor-pointer rounded-lg', className)}
    >
      {children}
    </button>
  );
};

export default Button;
