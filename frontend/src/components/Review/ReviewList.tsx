import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import apiClient from './../../utils/util';
import dayjs from 'dayjs';
import Loading from '../common/Loading';
import Intro from '@components/common/Intro';

type ReviewData = {
  reviewInfo: {
    writer: string;
    rating: number;
    content: string;
    date: string;
  };
  mentorInfo: {
    mentorId: number;
    name: string;
    companyName: string;
    department: string;
    profileImg: string;
  };
};

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Array<ReviewData>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/review', {
          params: { month: dayjs().format('M') },
        });
        const data = response.data as Array<ReviewData>;
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-500" />
          ) : (
            <FaRegStar key={index} className="text-yellow-500" />
          )
        )}
      </div>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <Intro
          title="정보와 경험을 나누는 foss 의 실시간 리뷰"
          sub="멘토와의 면접에 대한 생생한 후기를 한눈에 확인해보세요."
        />
        <div className="relative overflow-x-auto w-full mx-10 my-10">
          <div className="flex flex-wrap mx-2">
            {reviews.length === 0 ? (
              <div className="text-center w-full">리뷰가 없습니다.</div>
            ) : (
              reviews.map((reviewData, index) => (
                <div key={index} className="w-1/3 mb-4">
                  <div className="max-w-md p-6 bg-white border border-slate-200 rounded-lg shadow mr-4">
                    {reviewData.mentorInfo && (
                      <div className="flex items-center mb-4">
                        <img
                          src={reviewData.mentorInfo.profileImg}
                          alt={reviewData.mentorInfo.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <div className="font-bold text-lg">
                            {reviewData.mentorInfo.name} 멘토
                          </div>
                          <div className="text-sm text-slate-400">
                            {reviewData.mentorInfo.companyName} / {reviewData.mentorInfo.department}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <div className="inline">
                        {renderRatingStars(reviewData.reviewInfo.rating)}
                      </div>
                      <div className="text-sm text-slate-400 inline">
                        {dayjs(reviewData.reviewInfo.date).format('YYYY-MM-DD')}
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      {reviewData.reviewInfo.writer}
                    </div>
                    <div
                      className="mt-3 mb-5"
                      style={{
                        height: '4rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {reviewData.reviewInfo.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
