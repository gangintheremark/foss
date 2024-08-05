import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';
import Nav from '@/components/Header/NavComponent';

import { Post } from '@/types/board';

import { formatRegDateV1 } from '@/components/Community/util/formatRegDate';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReadPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const nav = useNavigate();

  // 렌더링 시 게시글 조회
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/community/${id}`);
        const post = response.data;
        if (post) {
          setPost(post);
          setIsAuthenticated(post.owner);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  // 게시글 수정
  const onUpdatePost = () => {
    nav(`/community/${id}/update`);
  };

  // 게시글 삭제
  const onDeletePost = () => {
    const fetchPost = async () => {
      try {
        await apiClient.delete(`/community/${id}`);
        nav('/community');
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  };

  // 로딩 안됐으면 로딩 스피너 렌더링
  if (loading || post === undefined) {
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

      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-2xl bg-white border border-gray-300 shadow-lg rounded-lg p-6">
          {/* 게시글 ID */}
          <div className="text-2xl font-bold text-teal-700 mb-4">{post.postId}번 게시글</div>

          {/* 제목 */}
          <div className="text-xl font-semibold text-gray-900 mb-4">
            제목
            <div className="text-teal-600 font-medium mt-1">{post.title}</div>
          </div>

          {/* 글쓴이 */}
          <div className="text-md text-gray-700 mb-4">
            글쓴이
            <div className="font-semibold text-gray-900 mt-1">{post.writer}</div>
          </div>

          {/* 작성일 */}
          <div className="text-md text-gray-700 mb-6">
            작성일
            <div className="font-semibold text-gray-900 mt-1">{formatRegDateV1(post.regDate)}</div>
          </div>

          {/* 내용 */}
          <div className="text-md text-gray-700">
            내용
            <p className="mt-2">{post.content}</p>
          </div>

          {isAuthenticated ? (
            <div className="flex gap-4 justify-end">
              <Button text={'수정'} type={'UPDATE'} onClick={onUpdatePost} />
              <Button text={'삭제'} type={'DELETE'} onClick={onDeletePost} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReadPost;
