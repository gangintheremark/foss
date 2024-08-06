import apiClient from '@/utils/util';
import Loading from '@/components/common/Loading';
import Nav from '@/components/Header/NavComponent';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface MenteeInfo {
  menteeId: number;
  name: string;
  feedback: string[];
}

interface Interview {
  interviewId: number;
  date: string;
  menteeInfos: MenteeInfo[];
}

const TmpFeedBackDetailPage = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menteeInfos, setMenteeInfos] = useState([
    {
      menteeId: 2,
      name: '남경민',
      feedback: [
        '말씀을 정말 잘하시네요. 굿입니다....',
        '말씀을 하실 때, 자꾸 움직이십니다...',
        '종합적으로 잘하시네요...',
      ],
    },
    {
      menteeId: 3,
      name: '김형민',
      feedback: [
        '문제 해결 능력이 뛰어납니다...',
        '설명이 조금 부족합니다...',
        '전반적으로 좋습니다...',
      ],
    },
  ]);
  const [curMenteeIndex, setCurMenteeIndex] = useState(0);
  const [interview, setInterview] = useState<Interview>({
    interviewId: 1,
    date: '2024-08-05 22:00',
    menteeInfos: [
      {
        menteeId: 2,
        name: '남경민',
        feedback: [
          '말씀을 정말 잘하시네요. 굿입니다....',
          '말씀을 하실 때, 자꾸 움직이십니다...',
          '종합적으로 잘하시네요...',
        ],
      },
      {
        menteeId: 3,
        name: '김형민',
        feedback: [
          '문제 해결 능력이 뛰어납니다...',
          '설명이 조금 부족합니다...',
          '전반적으로 좋습니다...',
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await apiClient.get(`/feedback/mentor/todo/${id}`);
        const interview = response.data;
        if (interview) {
          setInterview(interview);
          setMenteeInfos(interview.menteeInfos);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, []);

  // 멘티별 피드백 작성을 위한 네비게이션
  const onClickButton = (index: number) => {
    setCurMenteeIndex(index);
  };

  const onSaveFeedback = () => {
    const fetchFeedback = async () => {
      try {
        await apiClient.put('/feedback/mentor', {
          interviewId: interview.interviewId,
          feedbacks: menteeInfos.map((menteeInfo) => {
            return {
              menteeId: menteeInfo.menteeId,
              goodPoint: menteeInfo.feedback[0],
              badPoint: menteeInfo.feedback[1],
              summary: menteeInfo.feedback[2],
            };
          }),
        });

        nav('/tmp-feedback');
      } catch (error) {
        console.error(error);
        // console.log({
        //   interviewId: interview.interviewId,
        //   feedbacks: menteeInfos.map((menteeInfo) => {
        //     return {
        //       menteeId: menteeInfo.menteeId,
        //       goodPoint: menteeInfo.feedback[0],
        //       badPoint: menteeInfo.feedback[1],
        //       summary: menteeInfo.feedback[2],
        //     };
        //   }),
        // });
      }
    };

    fetchFeedback();
  };

  // 게시글 수정 취소
  const onCancelFeedback = () => {
    const confirmCancel = window.confirm('수정을 취소하시겠습니까?');

    if (confirmCancel) {
      nav('/tmp-feedback');
    }
  };

  // 피드백 필드 변경 핸들러
  const onChangeFeedback =
    (field: 'goodPoint' | 'badPoint' | 'summary') =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setMenteeInfos((prevMenteeInfos) => {
        const updatedMenteeInfos = [...prevMenteeInfos];
        const updatedFeedbacks = [...updatedMenteeInfos[curMenteeIndex].feedback];

        if (field === 'goodPoint') {
          updatedFeedbacks[0] = newValue;
        } else if (field === 'badPoint') {
          updatedFeedbacks[1] = newValue;
        } else if (field === 'summary') {
          updatedFeedbacks[2] = newValue;
        }

        updatedMenteeInfos[curMenteeIndex] = {
          ...updatedMenteeInfos[curMenteeIndex],
          feedback: updatedFeedbacks,
        };

        return updatedMenteeInfos;
      });
    };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // 로딩 안됐으면 로딩 스피너 렌더링
  if (loading || interview === undefined) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <div className="absolute top-[200px] text-4xl font-bold left-1/2 transform -translate-x-1/2">
        면접일 - {interview.date}
      </div>

      <div className="absolute top-[300px] m-4 p-4 border left-1/2 transform -translate-x-1/2">
        멘티 이름 - {menteeInfos[curMenteeIndex].name}
      </div>

      {/* 멘티 네비게이션 바 */}
      <div className="fixed top-[300px] left-[1600px]">
        <div className="px-16 py-4 text-center cursor-pointer border" onClick={scrollToTop}>
          top
        </div>
        {interview.menteeInfos.map((menteeInfo, index) => (
          <div
            className={`px-16 py-8 text-center cursor-pointer border ${
              curMenteeIndex === index ? 'bg-blue-400' : 'bg-white'
            }`}
            onClick={() => onClickButton(index)}
          >
            {menteeInfo.name}
          </div>
        ))}
        <div
          className="px-16 py-4 text-center text-center cursor-pointer border"
          onClick={scrollToBottom}
        >
          bottom
        </div>
      </div>

      {/* 피드백 */}
      <div className="absolute top-[400px] left-1/2 transform -translate-x-1/2">
        <div className="p-4 border">
          {/* 좋은점 */}
          <div className="m-4 bg-blue-300">
            <div className="p-4 border">좋은점</div>
            <textarea
              className="w-[1000px] h-[300px] resize-none overflow-scroll p-4 border"
              value={menteeInfos[curMenteeIndex].feedback[0]}
              onChange={onChangeFeedback('goodPoint')}
            />
          </div>

          {/* 나쁜점 */}
          <div className="m-4 bg-blue-300">
            <div className="p-4 border">나쁜점</div>
            <textarea
              className="w-[1000px] h-[300px] resize-none overflow-scroll p-4 border"
              value={menteeInfos[curMenteeIndex].feedback[1]}
              onChange={onChangeFeedback('badPoint')}
            />
          </div>

          {/* 요약 */}
          <div className="m-4 bg-blue-300">
            <div className="p-4 border">요약</div>
            <textarea
              className="w-[1000px] h-[300px] resize-none overflow-scroll p-4 border"
              value={menteeInfos[curMenteeIndex].feedback[2]}
              onChange={onChangeFeedback('summary')}
            />
          </div>
        </div>

        {/* 제출 or 취소 */}
        <div className="text-right">
          <button className="p-4 border bg-green-500" onClick={onSaveFeedback}>
            제출
          </button>
          <button className="p-4 border bg-red-500" onClick={onCancelFeedback}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default TmpFeedBackDetailPage;
