import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';

import { Post } from '@/types/board';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReadPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await apiClient.get(`/community/${id}`);
        const post = postResponse.data;
        if (post) {
          setPost(post);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const onUpdatePost = () => {
    nav(`/community/${id}/update`);
  };

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

  if (loading || post === undefined) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 shadow-lg rounded-lg">
        <div className="text-2xl font-bold text-teal-800 mb-4">{post.postId}번 게시글</div>
        <div className="text-xl font-semibold text-gray-800 mb-4">제목 - {post.title}</div>
        <div className="text-md text-gray-600 mb-4">글쓴이 - {post.writer}</div>
        <div className="text-md text-gray-600 mb-4">작성일 - {post.regDate}</div>
        <div className="text-md text-gray-600 mb-4">내용 - {post.content}</div>

        <div className="flex gap-4 mt-6">
          <Button text="수정" type={'UPDATE'} onClick={onUpdatePost} />
          <Button text="삭제" type={'DELETE'} onClick={onDeletePost} />
        </div>
      </div>
    </>
  );
};

export default ReadPost;
