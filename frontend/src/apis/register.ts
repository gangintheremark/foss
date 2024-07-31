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
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMentorSchedule = async (month: number) => {
  try {
    const response = await apiClient.get(`/schedules/mentors?month=${month}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMentorScheduleForMentee = async (mentorId: number) => {
  try {
    const response = await apiClient.get(`/schedules/mentees/${mentorId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteMentorSchdule = async (schedule_id: number) => {
  try {
    const response = await apiClient.delete(`schedules/mentors/${schedule_id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const postMentorSchedule = async (scheduleId: number, memberIds: Array<number>) => {
  try {
    const response = await apiClient.post(`interviews/mentors`, {
      scheduleId: scheduleId,
      memberIds: memberIds,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
