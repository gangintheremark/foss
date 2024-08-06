import { useNavigate } from 'react-router-dom';
import UnwrittenFeedbackCard from './UnwrittenFeedbackCard';

interface MenteeInfo {
  menteeId: number;
  name: string;
}

interface Interview {
  interviewId: number;
  date: string;
  menteeInfos: MenteeInfo[];
}

interface UnwrittenFeedbackCardListProps {
  interviews: Interview[];
}

const UnwrittenFeedbackCardList: React.FC<UnwrittenFeedbackCardListProps> = ({ interviews }) => {
  const nav = useNavigate();

  return (
    <div className="flex">
      {interviews.map((interview) => (
        <div
          key={interview.interviewId}
          onClick={() => nav(`/tmp-feedback/${interview.interviewId}`)}
          className="cursor-pointer hover:bg-blue-500"
        >
          <UnwrittenFeedbackCard interview={interview} />
        </div>
      ))}
    </div>
  );
};

export default UnwrittenFeedbackCardList;
