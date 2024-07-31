import apiClient from '@/utils/util';

export const postMentorSchedules = async (prop: string) => {
  try {
    const response = await apiClient.post('/schedules/mentors', {
      date: prop,
    });
    return response.data;
  } catch (error) {
    return;
  }
};
