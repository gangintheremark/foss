import { mentorFeedBackTitle } from '@/constants/feedBackInfo';
import useFeedBackStore from '@/store/feedback';
import { TMenteeFeedBack } from '@/types/type';
import { ReactNode, useState } from 'react';
import ReviewModal from '../Review/ReviewModal';

function FeedBackDetailForm(feedback: string | TMenteeFeedBack, index: number): ReactNode {
  const { mentorInfo } = useFeedBackStore((state) => state.states);
  const [open, setOpen] = useState(false);
  const [star, setStar] = useState(5);
  const onChangeStar = (pos: number) => {
    setStar(pos);
  };
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
            onClick={() => setOpen(!open)}
          >
            평가하기
          </button>
        </div>
        <div className={`${'text-[rgba(28,31,41,0.64)]'} w-3/4`}>{feedback.content}</div>
        {open && (
          <>
            <ReviewModal star={star} onChangeStar={onChangeStar} />
          </>
        )}
      </>
    );
  }
}

export default FeedBackDetailForm;
