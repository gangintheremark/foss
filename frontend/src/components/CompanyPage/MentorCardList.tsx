import { tmpMentors } from '@constants/tmpMentors';
import MentorCard from '@components/CompanyPage/MentorCard';

interface MentorCardListProps {
  company: string;
}

const MentorCardList: React.FC<MentorCardListProps> = ({ company }) => {
  const mentors = tmpMentors.filter((mentor) => mentor.companyName === company);

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {mentors.map((mentor) => (
          <MentorCard {...mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorCardList;
