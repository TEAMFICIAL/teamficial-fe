type LinkType = 'behance' | 'github' | 'notion' | 'linkedin' | 'other';

export const getLinkType = (url: string): LinkType => {
  if (url.includes('behance.net')) return 'behance';
  if (url.includes('github.com')) return 'github';
  if (url.includes('notion.so')) return 'notion';
  if (url.includes('linkedin.com')) return 'linkedin';
  return 'other';
};
