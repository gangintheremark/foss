import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';

import { Post } from '@/types/board';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeBoardView = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await apiClient.get('/community');
        const posts = postsResponse.data;
        if (posts) {
          setPosts(posts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading || posts === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative absolute top-[100px]">자유 게시판</div>

      <table className="relative absolute top-[200px]">
        <thead>
          <tr>
            <th className="w-1/6 border p-4">번호</th>
            <th className="w-1/2 border p-4">제목</th>
            <th className="w-1/6 border p-4">글쓴이</th>
            <th className="w-1/6 border p-4">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.postId}
              onClick={() => {
                nav(`/community/${post.postId}`);
              }}
            >
              <td className="w-1/6 border p-4">{post.postId}번</td>
              <td className="w-1/2 border p-4">{post.title}</td>
              <td className="w-1/6 border p-4">{post.writer}</td>
              <td className="w-1/6 border p-4">{post.regDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="relative absolute top-[200px]">
        <Button text={'글 쓰기'} type={'CREATE'} onClick={() => nav('/community/create')} />
      </div>
    </div>
  );
};

export default FreeBoardView;
