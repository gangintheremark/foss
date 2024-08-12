import { putFeedbackRating } from '@/apis/feedback';
import { MySwal } from '@/config/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { IFeedBackDetail } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFeedbackRate = (respondentId: number, menteeId: number, rating: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: QUERY_KEY.FEEDBACK_RATE(respondentId, menteeId),
    mutationFn: () => putFeedbackRating(respondentId, menteeId, rating),
    onSuccess: () => {
      //   const oldData: IFeedBackDetail | undefined = queryClient.getQueryData(
      //     QUERY_KEY.FEEDBACK_DETAIL(respondentId)
      //   );
      queryClient.setQueryData<IFeedBackDetail | undefined>(
        QUERY_KEY.FEEDBACK_DETAIL(respondentId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            menteeFeedbacks: old.menteeFeedbacks.map((feedback) =>
              feedback.menteeId === menteeId ? { ...feedback, evaluated: true } : feedback
            ),
          };
        }
      );
      MySwal.fire({
        icon: 'success',
        text: '평가를 완료했습니다',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      MySwal.fire({
        icon: 'error',
        text: '오류가 발생했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  return { mutate };
};
