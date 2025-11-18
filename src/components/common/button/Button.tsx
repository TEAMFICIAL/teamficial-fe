import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn('cursor-pointer rounded-lg', className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
