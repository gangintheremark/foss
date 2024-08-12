import MentorCard from '@components/CompanyPage/MentorCard';
import React, { useState, useEffect } from 'react';
import apiClient from '@/utils/util';
import Loading from '../common/Loading';

interface Mentor {
  memberId: number;
  name: string;
  profileImg: string;
  selfProduce: string;
  companyName: string;
  logoImg: string;
  department: string;
  interviewCnt: number;
  rating: number;
}

interface MentorCardListProps {
  id: number;
}

const MentorCardList: React.FC<MentorCardListProps> = ({ id }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        console.log(id);
        const response = await apiClient.get(`/members/mentors/cards/${id}`);
        setMentors(response.data);
        console.log(response.data);
      } catch (err) {
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [id]);

  // if (loading) return <div>Loading...</div>;
  // 로딩 안됐으면 일단 리턴
  // 로딩 안됐으면 로딩 스피너 렌더링
  if (loading) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.memberId} {...mentor} />
        ))}
      </div>
    </div>
  );
};
export default MentorCardList;
