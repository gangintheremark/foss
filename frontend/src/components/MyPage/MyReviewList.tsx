import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import apiClient from './../../utils/util';
import dayjs from 'dayjs';
import Loading from '../common/Loading';

type MyReview = {
  writer: string;
  rating: number;
  content: string;
  date: string;
};

const MyReviewList = ({ title }: { title: string }) => {
  const [reviews, setReviews] = useState<Array<MyReview>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/review/mentor/my', {
          params: { month: dayjs().format('M') },
        });
        const data = response.data as Array<MyReview>;
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
        {Array.from({ length: 5 }, (_, index) => (
          index < rating ? <FaStar key={index} className="text-yellow-500" /> : <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative overflow-x-auto w-full mx-10 my-10">
        <div className="flex flex-wrap mx-2">
          {reviews.map((review, index) => (
            <div key={index} className="w-1/2 mb-4">
              <div className="max-w-md p-6 bg-white border border-slate-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <div className="inline">{renderRatingStars(review.rating)}</div>
                  <div className="text-sm text-slate-400 inline">{dayjs(review.date).format('YYYY-MM-DD')}</div>
                </div>
                <div className="text-sm text-slate-400">{review.writer}</div>
                <div
                      className="mt-3 mb-5"
                      style={{
                        height: '8rem',
                        overflow: 'auto',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none',
                      }}
                    >
                      <div className="mt-2" dangerouslySetInnerHTML={{ __html: review.content }} />
                    </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyReviewList;
