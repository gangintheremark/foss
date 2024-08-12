import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import apiClient from './../../utils/util';
import Nav from '@components/Header/NavComponent';
import Intro from '@components/common/Intro';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReviewForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [respondentId] = useState(location.state?.respondentId);
  const [loadingCheck, setLoadingCheck] = useState(true);


  const checkIfAlreadySubmitted = async () => {
    try {
      const response = await apiClient.get(`/feedback/checkReview`, {
        params: { respondentId }
      });
      console.log(response.data);
      if (response.data.isCheckReview) {
        navigate('/review');
      }
    } catch (err) {
      console.error('Error checking review status');
    } finally {
      setLoadingCheck(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || content.trim() === '') {
      setError('별점과 내용을 모두 입력해주세요.');
      return;
    }

    if (content.length > 1000) {
      Swal.fire({
        icon: 'error',
        text: '리뷰는는 최대 1000자까지 입력할 수 있습니다.',
      });
      return;
    }

    checkIfAlreadySubmitted();

    setLoading(true);
    try {
      await apiClient.post('/review', {
        respondentId,
        content,
        rating,
      });
      setContent('');
      setRating(0);
      setError('');
      Swal.fire({
        icon: 'success',
        title: '리뷰 작성 완료',
        text: '리뷰가 성공적으로 작성되었습니다.',
      }).then(() => {
        navigate('/review');
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('리뷰 작성에 실패하였습니다. 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
  };

  const renderRatingStars = () => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            size={'1.5rem'}
            key={index}
            className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => {
              setRating(index + 1);
              setError('');
            }}
          />
        ))}
      </div>
    );
  };

  if (loadingCheck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <Intro
              title="리뷰를 작성해주세요"
              sub="귀하의 리뷰는 다른 사용자에게 큰 도움이 됩니다!"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">{renderRatingStars()}</div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border border-slate-300 rounded resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="내용을 입력해주세요."
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loading}
              >
                {loading ? '작성중...' : '작성하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
