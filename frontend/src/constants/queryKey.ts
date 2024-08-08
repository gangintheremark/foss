export const QUERY_KEY = {
  // 멘토가 일정 조회할 때
  MENTOR_CHECK: (month: number) => ['mentor', month],
  // 멘티 등록할 때
  MENTEE_REQ: (mentorId: number) => ['mentee', mentorId],
  // 멘토 일정 확정
  MENTOR_CONFIRM: (scheduleId: number) => ['mentor_confirm', scheduleId],
  // 멘토 일정 취소
  MENTOR_CANCEL: (scheduleId: number) => ['mentor_cancel', scheduleId],
  // 피드백 조회
  FEEDBACK_VIEW: ['feedback'],
  // 피드백 상세 조회
  FEEDBACK_DETAIL: (respondent_id: number) => ['feedback_detail', respondent_id],
  // 피드백 평가 -> 상세 조회 업데이트를 위해 쿼리 사용
  FEEDBACK_RATE: (respondentId: number, menteeId: number) => [
    'feedback_rating',
    respondentId,
    menteeId,
  ],
};
