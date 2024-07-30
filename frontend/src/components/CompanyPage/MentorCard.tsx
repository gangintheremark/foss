import { useNavigate } from 'react-router-dom';

const MentorCard = ({ id, profileUrl, name, company, job, helps, score }) => {
  const nav = useNavigate();

  const onClickMentorCard = () => {
    const queryParams = new URLSearchParams({ id: id }).toString();
    nav(`/?${queryParams}`);
  };

  return (
    <div
      className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 p-4"
      onClick={onClickMentorCard}
    >
      <div className="flex flex-col border-2 rounded-xl shadow-xl overflow-hidden min-w-[300px] min-h-[300px] max-w-[400px] max-h-[400px]">
        <div className="flex flex-col min-h-[250px] max-h-[250px] bg-gradient-to-br from-blue-900 via-teal-600 to-green-300">
          <div>
            <img className="w-32 h-32 rounded-full border m-4" src={profileUrl} />
          </div>
          <div className="flex flex-col justify-around min-h-[90px] max-h-[90px] p-4">
            <div className="font-bold">{name}</div>
            <div>
              {company} | {job}
            </div>
          </div>
        </div>
        <div className="flex justify-between min-h-[50px] max-h-[50px] p-4">
          <div>foss {helps}회</div>
          <div>매너 점수 {score}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
