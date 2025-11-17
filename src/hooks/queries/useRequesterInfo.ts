'use client';

import { useQuery } from '@tanstack/react-query';
import { getRequesterInfo } from '@/libs/api/teampsylog';

export const useRequesterInfo = (uuid: string) => {
  return useQuery({
    queryKey: ['requesterInfo', uuid],
    queryFn: () => getRequesterInfo(uuid),
    enabled: !!uuid,
  });
};
