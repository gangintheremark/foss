import { useMentorCancel } from '@/hooks/apis/mutations/useMentorCancel';
import { IoCheckmarkCircle } from "react-icons/io5";

const MentorCancleBtn = ({ id }: { id: number }) => {
  const { mutate } = useMentorCancel(id);
  return (
    <>
    <button
      className="text-black rounded h-[40px] w-full mx-auto mt-3 flex items-center justify-center hover:text-red-500"
      onClick={() => {
        mutate();
      }}
    >
      <IoCheckmarkCircle className='mr-2' />
      일정을 취소하겠습니다
    </button>
  </>
  );
};

export default MentorCancleBtn;
