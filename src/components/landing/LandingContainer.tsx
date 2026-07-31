import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function LandingContainer({ children, className, innerClassName }: Props) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className={cn('mx-auto w-full max-w-5xl min-w-80', innerClassName)}>{children}</div>
    </div>
  );
}
