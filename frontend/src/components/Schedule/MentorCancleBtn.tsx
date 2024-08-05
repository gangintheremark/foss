import { useMentorCancel } from '@/hooks/apis/mutations/useMentorCancel';

const MentorCancleBtn = ({ id }: { id: number }) => {
  const { mutate } = useMentorCancel(id);
  return (
    <button
      className="bg-neutral-500 text-white rounded text-lg h-[40px] w-1/3 mx-auto mt-3"
      onClick={() => {
        mutate();
      }}
    >
      취소
    </button>
  );
};

export default MentorCancleBtn;
