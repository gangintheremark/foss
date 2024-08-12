import React from 'react';
import { Link } from 'react-router-dom';

const VideoNotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600">잘못된 접근입니다</h1>
      <p className="mt-4 text-lg text-gray-700">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default VideoNotFoundPage;
