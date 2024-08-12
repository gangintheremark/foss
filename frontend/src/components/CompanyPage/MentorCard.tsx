import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Mentor {
  memberId: number;
  name: string;
  profileImg: string;
  selfProduce: string;
  companyName: string;
  logoImg: string;
  department: string;
  interviewCnt: number;
  rating: number;
}

const MentorCard: React.FC<Mentor> = ({
  memberId,
  name,
  profileImg,
  selfProduce,
  companyName,
  logoImg,
  department,
  interviewCnt,
  rating,
}) => {
  const nav = useNavigate();

  const onClickMentorCard = (memberId: number) => {
    nav(`/register/mentee?mentorId=${memberId}`);
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-500" />
          ) : (
            <FaRegStar key={index} className="text-yellow-500" />
          )
        )}
      </div>
    );
  };

  return (
    <div
      className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 p-4"
      onClick={() => onClickMentorCard(memberId)}
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
          <span className="text-sm text-gray-500">
            {companyName} | {department}
          </span>
          <div className="flex items-center mt-2">{renderRatingStars(rating)}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
