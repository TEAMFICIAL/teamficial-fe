import { cn } from '@/utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn('body-5 cursor-pointer rounded-lg px-5 py-3', className)}
    >
      {children}
    </button>
  );
};

export default Button;
