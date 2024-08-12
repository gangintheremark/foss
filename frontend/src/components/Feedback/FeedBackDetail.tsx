import Intro from '@components/common/Intro';
import pair from '../../assets/img/PairFeedBack.png';
import mentor from '../../assets/img/MentorFeedBack.png';
import { useEffect, useState } from 'react';
import useFeedBackStore from '@store/feedback';
import FeedBackDetailForm from './FeedBackDetailForm';
import { useNavigate } from 'react-router-dom';
import RegisterBtn from '../common/RegisterBtn';
import Robo from '@assets/image/robot.jpg';
import ErrorCompo from '../common/ErrorCompo';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import { getFeedbackDetail } from '@/apis/feedback';
import { TMenteeFeedBack } from '@/types/type';
import Loading from '../common/Loading';

const FeedBackDetail = () => {
  const [answerData, setAnswerData] = useState<(string[] | TMenteeFeedBack[])[]>([]);
  const imgArr = [mentor, pair];
  const [click, setClick] = useState(-1);
  const router = useNavigate();
  const { mentorInfo } = useFeedBackStore((state) => state.states);
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.FEEDBACK_DETAIL(mentorInfo.respondentId),
    queryFn: () => getFeedbackDetail(mentorInfo.respondentId),
  });

  useEffect(() => {
    if (data && data.mentorFeedback && data.menteeFeedbacks) {
      setAnswerData([data.mentorFeedback, data.menteeFeedbacks]);
    }
  }, [data]);
  const renderFeedbackDetails = () => {
    if (click === -1 || !answerData.length || !answerData[click])
      return (
        <div className="flex flex-col justify-center items-center h-full gap-4">
          <img src={Robo} width={64} height={64} alt="Robot" />
          <div>이미지를 눌러 피드백을 확인해보세요</div>
        </div>
      );

    return answerData[click].map((e, i) => (
      <div className="flex gap-1.5 font-bold text-sm w-full text-black" key={i}>
        <FeedBackDetailForm feedback={e} index={i} />
      </div>
    ));
  };
  if (error) {
    return (
      <>
        <ErrorCompo text="해당 정보를 찾을 수 없습니다" />
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {isLoading || !data || !answerData.length ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="w-11/12">
              <div className="flex items-center justify-center">
                <Intro
                  title={`#${mentorInfo.respondentId} ${mentorInfo.mentorInfo.companyName} ${mentorInfo.mentorInfo.name}와의 면접 미팅 피드백`}
                  sub={`${mentorInfo.date} ${mentorInfo.mentorInfo.name}의 면접 미팅에서의 피드백을 확인하세요.`}
                />
              </div>
              <div className="-mt-5">
                <RegisterBtn
                  text="멘토 리뷰 작성"
                  width="w-40"
                  height="h-10"
                  fontSize="text-sm"
                  onClick={() =>
                    router('/review/write', {
                      state: {
                        respondentId: data.respondentId,
                      },
                    })
                  }
                  disabled={data.isEvaluated}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-16 justify-center py-2">
                  {imgArr.map((e, i) => (
                    <div
                      className="w-16 h-16 relative cursor-pointer mx-10"
                      key={i}
                      onClick={() => setClick(i === click ? -1 : i)}
                    >
                      {i === click && (
                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-main-color blur-lg shadow-feedback"></div>
                      )}
                      <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <img src={e} alt={`Feedback ${i}`} className="w-32 h-20" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-16 justify-center pb-2 mt-4">
                  <div className="text-center mx-10 text-sm text-slate-400">멘토 피드백</div>
                  <div className="text-center mx-10 text-sm text-slate-400">유저 피드백</div>
                </div>
                <div className="w-full min-h-[615px] bg-full bg-no-repeat flex justify-center pb-16 pt-3">
                  <div
                    className="h-[350px] w-[700px] border-[1px] border-solid border-[rgba(28,31,34,0.2)]
                  overflow-scroll rounded-2xl px-4 py-6 flex flex-col gap-y-2.5"
                  >
                    {renderFeedbackDetails()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FeedBackDetail;
