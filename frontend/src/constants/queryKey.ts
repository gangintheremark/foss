export const QUERY_KEY = {
  // 멘토가 일정 조회할 때
  MENTOR_CHECK: (month: number) => ['mentor', month],
  // 전체 조회
  CALENDAR_CHECK: (month: number) => ['calendar', month],
  // 멘티 등록할 때
  MENTEE_REQ: (mentorId: number) => ['mentee', mentorId],
  MENTEE_CHECK: ['mentees'],
};
