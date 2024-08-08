import Intro from '@components/common/Intro';
import FeedbackCard from '@components/Feedback/FeedbackCard';
import useFeedBackStore from '@store/feedback';
import { FeedBackReducer } from '@/config/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { getFeedbackList } from '@/apis/feedback';
import { useQuery } from '@tanstack/react-query';
import Loading from '../common/Loading';
import ErrorCompo from '../common/ErrorCompo';

const FeedBackView = (props: FeedBackReducer) => {
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.FEEDBACK_VIEW,
    queryFn: getFeedbackList,
  });
  const { setData } = useFeedBackStore((state) => state.actions);
  if (error) {
    return (
      <>
        <ErrorCompo text="해당 정보를 찾을 수 없습니다" />
      </>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading || !data ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="w-11/12">
            <Intro title="모의 면접 피드백" sub="참여하신 면접에서의 피드백을 확인하세요." />
          </div>
          <div className="w-2/3 min-w-[960px] flex flex-wrap gap-9 mb-10">
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
        </>
      )}
    </div>
  );
};

export default FeedBackView;
