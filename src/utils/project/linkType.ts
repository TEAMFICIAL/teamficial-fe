// TODO : 다른 링크 타입 추가
type LinkType = 'behance' | 'github' | 'notion' | 'other';

export const getLinkType = (url: string): LinkType => {
  if (url.includes('behance.net')) return 'behance';
  if (url.includes('github.com')) return 'github';
  if (url.includes('notion.so')) return 'notion';
  return 'other';
};
