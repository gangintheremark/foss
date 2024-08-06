import apiClient from '@/utils/util';
import Loading from '@/components/common/Loading';
import UnwrittenFeedbackCardList from '@/components/TmpFeedBack/UnwrittenFeedbackCardList';
import { useEffect, useState } from 'react';

interface MenteeInfo {
  menteeId: number;
  name: string;
}

interface Interview {
  interviewId: number;
  date: string;
  menteeInfos: MenteeInfo[];
}

const TmpFeedBackView = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 여부
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      interviewId: 56789,
      date: '2024-08-15 22:00',
      menteeInfos: [
        {
          menteeId: 98765,
          name: '이영희',
        },
        {
          menteeId: 87654,
          name: '박민수',
        },
        {
          menteeId: 12321,
          name: '김지현',
        },
      ],
    },
    {
      interviewId: 67890,
      date: '2024-08-20 22:00',
      menteeInfos: [
        {
          menteeId: 32123,
          name: '최수민',
        },
        {
          menteeId: 43210,
          name: '이민수',
        },
        {
          menteeId: 54321,
          name: '박영수',
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await apiClient.get('/feedback/mentor');
        const interviews = response.data;
        if (interviews) {
          setInterviews(interviews);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // 로딩 중이면 로딩 스피너 렌더링
  if (loading || interviews === undefined) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="absolute top-[100px] text-4xl font-bold left-1/2 transform -translate-x-1/2">
        피드백 미작성 면접 리스트
      </div>
      <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2">
        <UnwrittenFeedbackCardList interviews={interviews} />
      </div>
    </div>
  );
};

export default TmpFeedBackView;
