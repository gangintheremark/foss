import { deleteMentorSchdule } from '@/apis/register';
import { MySwal } from '@/config/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export const useMentorCancel = (scheduleId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: QUERY_KEY.MENTOR_CANCEL(scheduleId),
    mutationFn: () => deleteMentorSchdule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MENTOR_CHECK(parseInt(dayjs().format('M'))),
      });
      MySwal.fire({
        icon: 'success',
        title: '모의 면접이 취소되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      MySwal.fire({
        icon: 'error',
        title: '오류가 발생했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  return {
    mutate,
  };
};
