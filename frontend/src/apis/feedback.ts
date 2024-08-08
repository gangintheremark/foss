import { TFeedBack } from '@/types/type';
import apiClient from '@/utils/util';

export const getFeedbackList = async () => {
  try {
    const response = await apiClient.get('/feedback');
    return response.data as Array<TFeedBack>;
  } catch (error) {
    return;
  }
};

export const getFeedbackDetail = async (respondent_id: number) => {
  try {
    const response = await apiClient.get(`/feedback/${respondent_id}`);
    return response.data;
  } catch (error) {
    return;
  }
};

export const putFeedbackRating = async (respondentId: number, menteeId: number, rating: number) => {
  try {
    const response = await apiClient.put('/feedback/ratings', {
      respondentId: respondentId,
      menteeId: menteeId,
      rating: rating,
    });
    return response;
  } catch (error) {
    return;
  }
};
