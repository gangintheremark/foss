import dayjs from 'dayjs';

// 여기도 일단은 빈 파일
export const minDate = dayjs().startOf('month').toDate();
export const maxDate = dayjs().add(1, 'month').endOf('month').toDate();
