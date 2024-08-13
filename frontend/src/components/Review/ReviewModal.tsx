import React, { useState, Suspense, lazy } from 'react';
import useFeedBackStore from '@/store/feedback';
import { useFeedbackRate } from '@/hooks/apis/mutations/useFeedbackRate';
import Loading from '../common/Loading'; // 로딩 상태를 표시할 컴포넌트
import StarIcon from '../common/Star';

const ReviewModal = () => {
  const [rating, setRating] = useState(0);
  const { mentorInfo, ratingMenteeId } = useFeedBackStore((state) => state.states);
  const { resetMenteeId, setOpen } = useFeedBackStore((state) => state.actions);
  const { mutate } = useFeedbackRate(mentorInfo.respondentId, ratingMenteeId, rating);

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] text-center p-4 rounded-3xl z-30">
        <div className="p-4">당신의 별점은?</div>
        <div className="flex justify-center mb-6">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              color={index < rating ? '#20ACA7' : 'none'}
              strokeColor="#20ACA7"
              size={8}
              className="cursor-pointer"
              onClick={() => {
                setRating(index + 1);
              }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2.5">
          <button
            className="w-20 bg-main-color-active p-2 rounded-md"
            onClick={() => {
              if (rating === 0) {
                alert('별점을 등록해주세요');
              } else {
                mutate();
                resetMenteeId();
                setOpen();
              }
            }}
          >
            별점 등록
          </button>
          <button
            className="w-20 bg-neutral-200 p-2 rounded-md"
            onClick={() => {
              setOpen();
              resetMenteeId();
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default ReviewModal;
