import Image from 'next/image';
import { getLinkType } from '@/utils/project/linkType';

interface ProfileLinksProps {
  links?: string[] | null;
}

const iconMap = {
  behance: '/icons/behance.svg',
  github: '/icons/github.svg',
  notion: '/icons/notion.svg',
  linkedin: '/icons/linkedin.svg',
  other: '/icons/etclink.svg',
} as const;

const ProfileLinks = ({ links }: ProfileLinksProps) => {
  const validLinks = (links || []).filter((l) => l && l.trim() !== '');

  const displayLinks = validLinks.length > 0 ? validLinks : ['', '', ''];

  return (
    <div className="flex justify-end gap-4">
      {displayLinks.map((link, i) => {
        if (link) {
          const type = getLinkType(link);
          return (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer">
              <Image src={iconMap[type]} alt={type} width={28} height={28} />
            </a>
          );
        }
        return (
          <Image key={i} src="/icons/empty-link.svg" alt="empty-link" width={28} height={28} />
        );
      })}
    </div>
  );
};

export default ProfileLinks;
