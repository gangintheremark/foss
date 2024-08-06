interface MenteeInfo {
  menteeId: number;
  name: string;
}

interface Interview {
  interviewId: number;
  date: string;
  menteeInfos: MenteeInfo[];
}

interface UnwrittenFeedbackCardProps {
  interview: Interview;
}

const UnwrittenFeedbackCard: React.FC<UnwrittenFeedbackCardProps> = ({ interview }) => {
  return (
    <div className="border p-4 m-4">
      <div className="p-4">면접 식별자 - {interview.interviewId}</div>
      <div className="p-4">면접일</div>
      <div className="p-4">{interview.date}</div>
      {interview.menteeInfos.map((menteeInfo, index) => (
        <div className="p-4">
          <div>
            멘티{index + 1}번 식별자 - {menteeInfo.menteeId}
          </div>
          <div>
            멘티{index + 1}번 이름 - {menteeInfo.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnwrittenFeedbackCard;
