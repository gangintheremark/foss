import { useNavigate } from 'react-router-dom';
import { Mentor } from '@/constants/tmpMentors';
import { FaStar } from 'react-icons/fa';

const MentorCard: React.FC<Mentor> = ({
  memberId,
  name,
  profileImg,
  selfProduce,
  companyName,
  department,
  interviewCnt,
  mannerTemp,
}) => {
  const nav = useNavigate();

  const onClickMentorCard = () => {
    const queryParams = new URLSearchParams({ id: memberId.toString() }).toString();
    nav(`/?${queryParams}`);
  };

  const formattedSelfProduce = (str: string) => {
    if (str.length < 15) {
      return str;
    } else {
      return str.slice(0, 15) + '...';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div
      className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 p-4"
      onClick={onClickMentorCard}
    >
      <div className="w-80 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden flex">
        <div className="flex-shrink-0 p-4 mt-5">
          <img className="w-24 h-24 rounded-full shadow-lg" src={profileImg} />
        </div>
        <div className="flex-grow p-6">
          <div className="absolute top-6 left-6 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            총 {interviewCnt} 회 진행
          </div>
          <h5 className="text-xl font-semibold text-gray-900">{name}</h5>
          <span className="text-sm text-gray-500">{companyName} | {department}</span>
          <div className="flex items-center mt-2">
            {renderStars(Math.round(mannerTemp))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
