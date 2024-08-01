import apiClient from '@/utils/util';
import Button from './Button';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Post = () => {
  // useEffect(() => {
  //   try {
  //     const { id } = useParams();
  //   } catch() {

  //   }
  // }, []);
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetchPost = async (id: any) => {
      try {
        console.log(`${id}`);
        setLoading(true);
        const postResponse = await apiClient.get(`/community/${id}`);
        console.log(postResponse);
        // const postResponse = await apiClient.get(`/posts/${id}`);
        const post = postResponse.data;
        console.log(post);
        if (id) {
          setPost(post);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(id);
  }, []);

  const onUpdatePost = () => {
    nav(`/community/${id}/update`);
  };
  if (loading) {
    return <div>aasdasd</div>;
  }

  const onDeletePost = () => {
    const fetchPost = async () => {
      try {
        const postResponse = await apiClient.delete(`/community/${id}`);
        nav('/community');
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPost();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!loading && (
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 shadow-lg rounded-lg">
          <div className="text-2xl font-bold text-teal-800 mb-4">{post.id}번</div>
          <div className="text-xl font-semibold text-gray-800 mb-4">제목 - {post.title}</div>

          <div className="flex gap-4 mt-6">
            <Button text="수정" type={'UPDATE'} onClick={onUpdatePost} />
            <Button text="삭제" type={'DELETE'} onClick={onDeletePost} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

{
  /* <div className="text-md text-gray-600 mb-4">글쓴이 - {post.writer}</div> */
}
{
  /* <div class
      Name="text-md text-gray-600 mb-4">내용 - {post.content}</div> */
}
