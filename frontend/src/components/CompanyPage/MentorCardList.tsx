import { tmpMentors } from '@constants/tmpMentors';
import MentorCard from '@components/CompanyPage/MentorCard';

const MentorCardList = ({ company }) => {
  const mentors = tmpMentors.filter((mentor) => mentor.company === company);

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} {...mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorCardList;
