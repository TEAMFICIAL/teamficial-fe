import { Tag } from '@/components/common/Tag';
import { formatDateDot, formatDday } from '@/utils/project/formatDate';
import Image from 'next/image';

interface RecruitCardProps {
  title: string;
  hashtag: string;
  author: string;
  date: string;
  profileImageUrl: string;
  duration: string;
  mode: string;
  dday: number;
  profileImage?: string;
  status: string;
  onClick?: () => void;
}

const RecruitCard = ({
  title,
  hashtag,
  author,
  date,
  duration,
  profileImageUrl,
  profileImage = '/icons/profile.svg',
  mode,
  dday,
  status,
  onClick,
}: RecruitCardProps) => {
  const isClosed = status === 'CLOSED';
  const finalProfileImage = profileImageUrl || profileImage;

  return (
    <article
      className="bg-gray-0 tablet:max-w-[304px] tablet:gap-6 tablet:p-5 relative flex w-full cursor-pointer flex-col justify-center gap-3 rounded-lg border-1 border-gray-300 px-5 py-4"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="tablet:gap-2.5 flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <Tag
              className={
                isClosed
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-gray-200 text-gray-700 disabled:bg-gray-400 disabled:text-gray-50'
              }
            >
              {duration}
            </Tag>
            <Tag
              className={
                isClosed
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-gray-200 text-gray-700 disabled:bg-gray-400 disabled:text-gray-50'
              }
            >
              {mode}
            </Tag>
          </div>
          <Tag
            className={
              isClosed
                ? 'bg-gray-300 text-gray-600'
                : 'bg-red-10 text-red-100 disabled:bg-gray-200 disabled:text-gray-500'
            }
          >
            {formatDday(dday)}
          </Tag>
        </div>
        <div className="flex flex-col">
          <span
            className={`tablet:title-3 body-5 truncate ${isClosed ? 'text-gray-600' : 'text-gray-900'}`}
          >
            {title}
          </span>
          <span
            className={`tablet:body-8 body-9 truncate ${isClosed ? 'text-gray-500' : 'text-gray-600'}`}
          >
            {hashtag}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <div className="flex items-center gap-2">
          <Image
            src={finalProfileImage}
            alt="profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className={`tablet:body-8 body-10 ${isClosed ? 'text-gray-600' : 'text-gray-700'}`}>
            {author}
          </span>
        </div>
        <span className={`tablet:body-8 body-10 ${isClosed ? 'text-gray-600' : 'text-gray-700'}`}>
          {formatDateDot(date)}
        </span>
      </div>
    </article>
  );
};

export default RecruitCard;
