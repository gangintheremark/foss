import React, { Suspense, lazy } from 'react';
import { useMentorCancel } from '@/hooks/apis/mutations/useMentorCancel';
import { useScheduleStore } from '@/store/schedule';
import Loading from '../common/Loading';

const IoCheckmarkCircle = lazy(() =>
  import('react-icons/io5').then((module) => ({ default: module.IoCheckmarkCircle }))
);

const MentorCancleBtn = ({ id }: { id: number }) => {
  const { mutate } = useMentorCancel(id);
  const { resetMenteeList, resetMentorData } = useScheduleStore((state) => state.actions);

  return (
    <Suspense fallback={<Loading />}>
      <button
        className="text-black rounded h-[40px] w-full mx-auto mt-3 flex items-center justify-center hover:text-red-500"
        onClick={() => {
          mutate();
          resetMentorData();
          resetMenteeList();
        }}
      >
        <IoCheckmarkCircle className="mr-2" />
        일정을 취소하겠습니다
      </button>
    </Suspense>
  );
};

export default MentorCancleBtn;
