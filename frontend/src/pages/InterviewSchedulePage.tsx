import apiClient from '@/utils/util';
import Nav from '@/components/Header/NavComponent';

const InterviewSchedulePage = () => {
  // 면접 종료 버튼을 누른 상황
  const fetchAI = async () => {
    try {
      const response = await apiClient.get('/returnzero/authenticate');
      const token = response.data;
      if (token) {
        console.log('됐다', token);
      }
    } catch (error) {
      console.error('망함', error);
    }
  };

  return (
    <>
      <Nav />
      <div>
        <button className="bg-blue-400" onClick={() => fetchAI()}>
          되나
        </button>
      </div>
    </>
  );
};

export default InterviewSchedulePage;
