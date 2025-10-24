import { cn } from '@/utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  className: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={cn('body-5 cursor-pointer rounded-lg px-5 py-3', className)}>
      {children}
    </button>
  );
};

export default Button;
