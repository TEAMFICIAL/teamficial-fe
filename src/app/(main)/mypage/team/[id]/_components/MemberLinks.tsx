import Image from 'next/image';
import { getLinkType } from '@/utils/project/linkType';
import { isValidUrl } from '@/utils/project/validateUrl';

const iconMap = {
  behance: '/icons/behance.svg',
  github: '/icons/github.svg',
  notion: '/icons/notion.svg',
  linkedin: '/icons/linkedin.svg',
  other: '/icons/etclink.svg',
} as const;

const MemberLinks = ({ links }: { links: string[] }) => {
  return (
    <div className="flex items-start justify-end gap-4">
      {Array.from({ length: 3 }).map((_, i) => {
        const linkIndex = links.length - 3 + i;
        const link = links[linkIndex];

        if (link && isValidUrl(link)) {
          const type = getLinkType(link);
          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${type} 링크`}
            >
              <Image src={iconMap[type]} alt="" width={28} height={28} />
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

export default MemberLinks;
