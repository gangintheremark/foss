import { IMentorCalender } from '@/types/calendar';
import apiClient from '@/utils/util';
import axios from 'axios';
// 멘토 일정 등록하기
export const postMentorSchedules = async (prop: string) => {
  try {
    const response = await apiClient.post('/schedules/mentors', {
      date: prop,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 전체 캘린더 일정 조회
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
// 멘토 일정 현황 가져오기
export const getMentorSchedule = async (month: string) => {
  try {
    const response = await apiClient.get(`/schedules/mentors?month=${month}`);
    console.log(response);
    return response.data as Array<IMentorCalender>;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 전체 일정에서 누르고 멘티 면접 지원하기 전 멘토에 관해 필요한 부분 데려오는 곳
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
// 멘토 일정 현황 삭제하기
export const deleteMentorSchdule = async (schedule_id: number) => {
  try {
    const response = await apiClient.delete(`schedules/mentors/${schedule_id}`);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 멘토 일정 확정짓기
export const postMentorSchedule = async (scheduleId: number, memberIds: Array<number>) => {
  try {
    const response = await apiClient.post(`interviews/mentors`, {
      scheduleId: scheduleId,
      memberIds: memberIds,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 멘티 지원하기
export const postMenteeSchedule = async (scheduleId: number, File: File) => {
  const formData = new FormData();
  formData.append('file', File);
  try {
    const response = await apiClient.post(`/schedules/mentees?scheduleId=${scheduleId}`, formData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const result = error.response;
      return result;
    } else {
      return;
    }
  }
};
