import { cn } from '@/utils/cn';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = '' }: TagProps) => {
  return (
    <div className={cn('body-9 inline-flex rounded-[4px] px-2 py-1 whitespace-nowrap', className)}>
      {children}
    </div>
  );
};

export const Keyword = ({ children, className = '' }: TagProps) => {
  return (
    <div className={cn('body-7 inline-flex rounded-lg whitespace-nowrap', className)}>
      {children}
    </div>
  );
};
