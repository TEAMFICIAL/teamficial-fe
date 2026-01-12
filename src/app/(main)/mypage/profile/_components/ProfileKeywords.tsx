import { Keyword } from '@/components/common/Tag';

interface ProfileKeywordsProps {
  keywords?: string[];
}

const ProfileKeywords = ({ keywords }: ProfileKeywordsProps) => {
  const defaultKeywords = ['대표키워드1', '대표키워드2', '대표키워드3'];
  const displayKeywords = keywords && keywords.length > 0 ? keywords : defaultKeywords;

  return (
    <div className="body-7 flex flex-wrap gap-2">
      {displayKeywords.map((k, i) => (
        <Keyword key={i} className="bg-gray-0 border border-gray-300 px-4 py-2 text-gray-600">
          #{k}
        </Keyword>
      ))}
    </div>
  );
};

export default ProfileKeywords;
