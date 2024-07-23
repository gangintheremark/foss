import { tmpMentors } from '@constants/tmpMentors';
import MentorCard from '@components/CompanyPage/MentorCard';

const MentorCardList = ({ company }) => {
  const mentors = tmpMentors.filter((mentor) => mentor.company === company);

  return (
    <div>
      <div>멘토 카드 모음</div>
      <div className="flex flex-wrap">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} {...mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorCardList;
