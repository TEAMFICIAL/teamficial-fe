import clsx from 'clsx';

type TagType = 'date' | 'text' | 'date-disabled' | 'text-disabled';

type TagProps = {
  type: TagType;
  children: React.ReactNode;
};

const Tag: React.FC<TagProps> = ({ type, children }) => {
  const baseStyle = 'inline-flex items-center justify-center body-9 px-2 py-1 rounded';

  const typeStyle = {
    date: 'bg-red-10 text-red-100',
    text: 'bg-gray-200 text-gray-700',
    'date-disabled': 'bg-gray-400 text-gray-50 cursor-not-allowed',
    'text-disabled': 'bg-gray-200 text-gray-500 cursor-not-allowed',
  }[type];

  return <span className={clsx(baseStyle, typeStyle)}>{children}</span>;
};

export default Tag;
