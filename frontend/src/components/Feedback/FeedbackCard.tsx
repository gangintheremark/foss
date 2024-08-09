import Card from '@components/common/Card';
import { TFeedBack } from 'types/type';

interface Props extends TFeedBack {
  onClick: () => void;
}

const FeedbackCard = (props: Props) => {
  return (
    <Card
      key={props.respondentId}
      onClick={props.onClick}
      mentorId={props.mentorInfo.mentorId}
      profileImg={props.mentorInfo.profileImg}
      name={props.mentorInfo.name}
      department={props.mentorInfo.department}
      companyName={props.mentorInfo.companyName}
    >
      <div className="font-bold text-xs text-[rgba(28,31,41,0.8)]">{props.date} 면접 미팅</div>
      <div className="w-full h-[150px] py-3">
        <img src={props.mentorInfo.logoImg} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[1px] bg-[rgba(28,31,34,0.08)]"></div>
    </Card>
  );
};

export default FeedbackCard;
