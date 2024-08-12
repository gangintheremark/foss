import { QUERY_KEY } from '@/constants/queryKey';
import apiClient from '@/utils/util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const useReviewPost = (respondentId: any, content: string, rating: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: QUERY_KEY.REVIEW(respondentId),
    mutationFn: async () =>
      await apiClient.post('/review', {
        respondentId,
        content,
        rating,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.FEEDBACK_DETAIL(parseInt(respondentId)),
      });
      Swal.fire({
        icon: 'success',
        title: '리뷰 작성 완료',
        text: '리뷰가 성공적으로 작성되었습니다.',
      });
    },
  });
  return {
    mutate,
  };
};
