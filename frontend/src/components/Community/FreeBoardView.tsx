import apiClient from '@/utils/util';
import Button from './Button';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeBoardView = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await apiClient.get('/community');
        // const postsResponse = await apiClient.get('/posts');
        const posts = postsResponse.data;
        if (posts) {
          setPosts(posts);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative w-full absolute top-[100px]">자유 게시판</div>

      <div className="relative absolute top-[200px] flex justify-center items-center min-h-screen">
        <table className="relative min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-teal-100 text-teal-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium border-b border-teal-200">번호</th>
              <th className="py-4 px-6 text-left font-medium border-b border-teal-200">제목</th>
              <th className="py-4 px-6 text-left font-medium border-b border-teal-200">글쓴이</th>
              <th className="py-4 px-6 text-left font-medium border-b border-teal-200">작성일</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-teal-50 cursor-pointer transition-colors duration-300 ease-in-out"
                onClick={() => {
                  nav(`/community/${post.id}`);
                }}
              >
                <td className="py-4 px-6 border-b border-teal-100">{post.id}번</td>
                <td className="py-4 px-6 border-b border-teal-100">{post.title}</td>
                <td className="py-4 px-6 border-b border-teal-100">김치</td>
                <td className="py-4 px-6 border-b border-teal-100">2024-08-01</td>
                {/* <td className="py-4 px-6 border-b border-teal-100">{post.writer}</td> */}
                {/* <td className="py-4 px-6 border-b border-teal-100">{post.regDate}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="relative absolute top-[200px]">
        <Button text={'글 쓰기'} type={'CREATE'} onClick={() => nav('/community/create')} />
      </div>
    </div>
  );
};

export default FreeBoardView;
