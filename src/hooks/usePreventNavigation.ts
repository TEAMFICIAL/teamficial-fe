'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const usePreventNavigation = (
  shouldPrevent: boolean,
  onNavigationAttempt: (navigate: () => void) => void,
) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldPrevent) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href) {
        const url = new URL(link.href);
        const isSameOrigin = url.origin === window.location.origin;
        const isDifferentPath = url.pathname !== pathname;

        if (isSameOrigin && isDifferentPath) {
          e.preventDefault();
          e.stopPropagation();

          onNavigationAttempt(() => {
            router.push(url.pathname + url.search + url.hash);
          });
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [shouldPrevent, pathname, router, onNavigationAttempt]);
};
