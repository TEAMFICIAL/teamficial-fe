interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag = ({ children, className = '' }: TagProps) => {
  return (
    <div className={`body-9 inline-flex rounded-[4px] px-2 py-1 ${className}`}>{children}</div>
  );
};

export default Tag;
