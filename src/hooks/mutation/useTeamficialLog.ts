'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTeamficialLog } from '@/libs/api/teampsylog';
import { RequestTeamficialLog } from '@/types/teampsylog';

export const useTeamficialLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestTeamficialLog) => postTeamficialLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamficialLog'] });
    },
    onError: (error) => {
      console.error('팀피셜록 생성 중 오류 발생:', error);
    },
  });
};
