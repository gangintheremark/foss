import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import apiClient from './../../utils/util';
import Nav from '@components/Header/NavComponent';
import Intro from '@components/common/Intro';
import { useLocation } from 'react-router-dom';

const ReviewForm: React.FC = () => {
    const location = useLocation();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [respondentId, setRespondentId] = useState(location.state?.respondentId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || content.trim() === '') {
            setError('별점과 내용을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            console.log(content, rating);
            await apiClient.post('/review', {
                respondentId,
                content,
                rating,
            });
            setContent('');
            setRating(0);
            setError('');
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

    return (
        <div className='w-screen h-screen flex flex-col'>
            <Nav />
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-3xl p-6 bg-white">
                    <form onSubmit={handleSubmit}>
                        <Intro title='리뷰를 작성해주세요' sub='귀하의 리뷰는 다른 사용자에게 큰 도움이 됩니다!' />
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="mb-4">
                            {renderRatingStars()}
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-2 border border-slate-300 rounded resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={12}
                                placeholder='내용을 입력해주세요.'
                                required
                            />
                        </div>
                        <div className='text-center'>
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
