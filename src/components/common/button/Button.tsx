import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn('cursor-pointer rounded-lg', className)}>
      {children}
    </button>
  );
};

export default Button;
