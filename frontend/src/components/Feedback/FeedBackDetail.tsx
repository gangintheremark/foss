import Intro from '@components/common/Intro';
import pair from '../../assets/img/PairFeedBack.png';
import ai from '../../assets/img/AIFeedBack.png';
import mentor from '../../assets/img/MentorFeedBack.png';
import { ReactNode, useState } from 'react';
import useFeedBackStore from '@store/feedback';
import { aiFeedBackTitle, mentorFeedBackTitle } from '@/constants/feedBackInfo';
import { TMenteeFeedBack } from '@/types/type';

const FeedBackDetail = () => {
  const imgArr = [mentor, ai, pair];
  const [click, setClick] = useState(0);
  const { detail } = useFeedBackStore((state) => state.states);
  // 이것도 같이 동기화 시켜버리기
  function isRenderMenteeFeedback(feedback: string | TMenteeFeedBack): ReactNode {
    if (typeof feedback === 'string') {
      return <div>{feedback}</div>;
    } else {
      // TMenteeFeedBack 타입에 맞는 렌더링 로직
      return <div>{feedback.content}</div>;
    }
  }
  const data = [detail.mentorFeedback, detail.ai, detail.menteeFeedback];
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12">
        <Intro
          title="#1 삼성전자 에드워드와의 면접 미팅 피드백"
          sub="2024.07.25 17:00 에드워드 와의 면접 미팅에서의 피드백을 확인하세요."
        />
        <div className="w-full min-h-[615px] bg-full bg-laptop bg-no-repeat flex gap-16 justify-center py-16">
          <div
            className="h-[350px] w-[334px] border-[1px] border-solid border-[rgba(28,31,34,0.2)]
           overflow-scroll rounded-2xl px-4 py-6 flex flex-col gap-y-2.5"
          >
            {click !== -1 &&
              data[click].map((e, i) => {
                return (
                  <div className="flex gap-1.5 font-bold text-sm w-full" key={i}>
                    <div className="text-main-color w-1/4">
                      {click === 0
                        ? mentorFeedBackTitle[i]
                        : click === 1
                        ? aiFeedBackTitle[i]
                        : '익명'}
                      {click === 2 ? (
                        <button
                          className="mt-1 text-[rgba(28,31,41,0.4)]"
                          onClick={() => alert('안녕')}
                        >
                          평가하기
                        </button>
                      ) : null}
                    </div>
                    <div className={`${'text-[rgba(28,31,41,0.64)]'} w-3/4`}>
                      {isRenderMenteeFeedback(e)}
                    </div>
                  </div>
                );
              })}
            {click === -1 && (
              <div className="text-[rgba(28,31,41,0.64)] font-bold">
                이미지를 눌러 피드백을 확인해보세요
              </div>
            )}
          </div>
          <div className="flex flex-col gap-16">
            {imgArr.map((e, i) => {
              return (
                <div
                  className="w-16 h-16 relative"
                  key={i}
                  onClick={() => {
                    if (i === click) {
                      setClick(-1);
                    } else {
                      setClick(i);
                    }
                  }}
                >
                  {i === click && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-main-color blur-lg shadow-feedback"></div>
                  )}
                  <div className=" w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <img src={e} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackDetail;
