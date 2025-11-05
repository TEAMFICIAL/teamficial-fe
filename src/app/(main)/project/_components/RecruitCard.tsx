import Tag from './Tag';
import Image from 'next/image';

interface RecruitCardProps {
  title: string;
  hashtag: string;
  author: string;
  date: string;
  duration: string;
  mode: string;
  dday: number;
  profileImage?: string;
  onClick?: () => void;
}

const RecruitCard = ({
  title,
  hashtag,
  author,
  date,
  duration,
  mode,
  dday,
  profileImage = '/icons/profile.svg',
  onClick,
}: RecruitCardProps) => {
  const renderDdayText = () => {
    if (dday > 0) return `D-${dday}`;
    if (dday === 0) return 'D-DAY';
    return '마감';
  };
  const ddayType = dday < 0 ? 'date-disabled' : 'date';

  const formatDate = (date: string) => date.split(' ')[0];

  return (
    <article
      className="bg-gray-0 flex max-w-[304px] cursor-pointer flex-col justify-center gap-6 rounded-lg border-1 border-gray-300 p-5"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <Tag type="text">{duration}</Tag>
            <Tag type="text">{mode}</Tag>
          </div>
          <Tag type={ddayType}>{renderDdayText()}</Tag>
        </div>
        <div className="flex flex-col">
          <span className="title-3 text-gray-900">{title}</span>
          <span className="body-8 text-gray-600">{hashtag}</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image src={profileImage} alt="profile" width={32} height={32} />
          <span className="body-8 text-gray-700">{author}</span>
        </div>
        <span className="body-8 text-gray-700">{formatDate(date)}</span>
      </div>
    </article>
  );
};

export default RecruitCard;
