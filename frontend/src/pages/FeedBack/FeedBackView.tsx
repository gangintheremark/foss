import Intro from '@components/common/Intro';
import Bgblur from '../../assets/svg/FeedBackBgBlur.svg?react';
import FeedbackCard from '@components/Feedback/FeedbackCard';
import useFeedBackStore from '@store/feedback';

const FeedBackView = () => {
  const { data } = useFeedBackStore((state) => state.states);
  return (
    <div className="flex flex-col justify-center items-center">
      <Bgblur className="absolute bottom-0 left-0" />
      <div className="w-11/12">
        <Intro
          title="면접 미팅 피드백"
          sub="닉네임이 참여하신 면접 미팅에서의 피드백을 확인하세요."
        />
      </div>
      <div className=" w-[1180px] flex flex-wrap gap-[47px] my-10">
        {data.map((e, i) => {
          return <FeedbackCard key={i} props={e} />;
        })}
      </div>
    </div>
  );
};

export default FeedBackView;
