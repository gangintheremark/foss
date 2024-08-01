import Intro from '@components/common/Intro';
import Bgblur from '../../assets/svg/FeedBackBgBlur.svg?react';
import FeedbackCard from '@components/Feedback/FeedbackCard';
import useFeedBackStore from '@store/feedback';
import { FeedBackReducer } from '@/config/config';

const FeedBackView = (props: FeedBackReducer) => {
  const { data } = useFeedBackStore((state) => state.states);
  const { setData } = useFeedBackStore((state) => state.actions);
  return (
    <div className="flex flex-col justify-center items-center">
      <Bgblur className="absolute bottom-0 left-0" />
      <div className="w-11/12">
        <Intro
          title="면접 미팅 피드백"
          sub="닉네임이 참여하신 면접 미팅에서의 피드백을 확인하세요."
        />
      </div>
      <div className="w-2/3 min-w-[960px] flex flex-wrap gap-9 my-10">
        {data.map((e, i) => {
          return (
            <FeedbackCard
              key={i}
              mentorInfo={e.mentorInfo}
              respondentId={e.respondentId}
              date={e.date}
              onClick={() => {
                props.dispatch({ type: 'PLUS' });
                setData(e);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeedBackView;
