const MentorCard = ({ name, nickname, company, career, job, score, profileUrl }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col border p-4">
        <div className="flex justify-between">
          <div>{name}</div>
          <div>매너 점수 {score}</div>
        </div>
        {/* <div>{nickname}</div> */}
        <img className="w-64 h-32" src={profileUrl} />
        <div className="flex justify-evenly">
          <div>{company}</div>
          <div>{career}년차</div>
          <div>{job}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
