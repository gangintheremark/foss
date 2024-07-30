import { useNavigate } from 'react-router-dom';
import { Mentor } from '@/constants/tmpMentors';

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

  return (
    <div
      className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 p-4"
      onClick={onClickMentorCard}
    >
      <div className="flex flex-col border-2 rounded-xl shadow-xl overflow-hidden min-w-[300px] min-h-[300px] max-w-[400px] max-h-[400px]">
        <div className="flex flex-col min-h-[250px] max-h-[250px] bg-gradient-to-br from-blue-900 via-teal-600 to-green-300">
          <div>
            <img className="w-32 h-32 rounded-full border m-4" src={profileImg} />
          </div>
          <div className="flex flex-col justify-around min-h-[90px] max-h-[90px] p-4">
            <div className="font-bold">{name}</div>
            <div>
              {companyName} | {department}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between min-h-[100px] max-h-[100px] p-4">
          <div>{formattedSelfProduce(selfProduce)}</div>
          <div className="flex justify-between">
            <div>foss {interviewCnt}회</div>
            <div>매너 점수 {mannerTemp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
