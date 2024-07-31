import apiClient from '@/utils/util';

export const postMentorSchedules = async (prop: string) => {
  try {
    const response = await apiClient.post('/schedules/mentors', {
      date: '2024-08-22 10:00',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getScheduleTotalList = async (month: number) => {
  try {
    const response = await apiClient.get(`/schedules?month=${month}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
