import { postReportCommment } from '@/libs/api/teampsylog';
import { RequestReportComment } from '@/types/teampsylog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostReportComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestReportComment) => postReportCommment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywordComment'] });
    },
    onError: (error) => {
      console.error('댓글 신고 중 오류 발생:', error);
    },
  });
};
