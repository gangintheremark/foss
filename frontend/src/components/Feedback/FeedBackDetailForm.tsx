import { mentorFeedBackTitle } from '@/constants/feedBackInfo';
import { TMenteeFeedBack } from '@/types/type';
import { ReactNode } from 'react';

function FeedBackDetailForm(feedback: string | TMenteeFeedBack, index: number): ReactNode {
  if (typeof feedback === 'string') {
    return (
      <>
        <div className="text-main-color w-1/4">{mentorFeedBackTitle[index]}</div>
        <div className={`${'text-[rgba(28,31,41,0.64)]'} w-3/4`}>{feedback}</div>
      </>
    );
  } else {
    return (
      // TMenteeFeedBack 타입에 맞는 렌더링 로직
      <>
        <div className="text-main-color w-1/4 flex flex-col">
          <div>익명</div>
          <button
            disabled={feedback.isEvaluated}
            className="mt-1 text-[rgba(28,31,41,0.4)]  text-left"
            onClick={() => alert('안녕')}
          >
            평가하기
          </button>
        </div>
        <div className={`${'text-[rgba(28,31,41,0.64)]'} w-3/4`}>{feedback.content}</div>
      </>
    );
  }
}

export default FeedBackDetailForm;
