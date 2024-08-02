export const QUERY_KEY = {
  // 멘토가 일정 조회할 때
  MENTOR_CHECK: (month: number) => ['mentor', month],
  // 멘티 등록할 때
  MENTEE_REQ: (mentorId: number) => ['mentee', mentorId],
  // 멘토 일정 확정
  MENTOR_CONFIRM: (scheduleId: number) => ['mentor_confirm', scheduleId],
  // 멘토 일정 취소
  MENTOR_CANCEL: (scheduleId: number) => ['mentor_cancel', scheduleId],
};
