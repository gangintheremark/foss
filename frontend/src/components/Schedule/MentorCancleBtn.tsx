import { useMentorCancel } from '@/hooks/apis/mutations/useMentorCancel';

const MentorCancleBtn = ({ id }: { id: number }) => {
  const { mutate } = useMentorCancel(id);
  return (
    <button
      className="bg-purple text-white rounded text-lg h-[50px] w-1/3 mx-auto mt-3"
      onClick={() => {
        mutate();
      }}
    >
      삭제하기
    </button>
  );
};

export default MentorCancleBtn;
