import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';
import Nav from '@/components/Header/NavComponent';
import Swal from 'sweetalert2';

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
          // 콘텐츠 내의 줄바꿈을 <br> 태그로 변환하여 저장
          post.content = post.content.replace(/\n/g, '<br>');
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
  }, [id]);

  // 게시글 수정
  const onUpdatePost = () => {
    nav(`/community/${id}/update`);
  };

  // 게시글 삭제
  const onDeletePost = () => {
    Swal.fire({
      html: '정말로 이 게시글을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 삭제합니다',
      cancelButtonText: '아니요, 유지합니다',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchPost = async () => {
          try {
            await apiClient.delete(`/community/${id}`);
            nav('/community');
          } catch (error) {
            console.error(error);
          }
        };

        fetchPost();
      }
    });
  };

  // 목록으로 가기
  const goToList = () => {
    nav('/community');
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
      <div className="fixed top-0 w-full">
        <Nav />
      </div>

      <div
        className="flex items-center justify-center bg-gray-50 p-6"
        style={{ marginTop: '60px' }}
      >
        <div className="w-full max-w-3xl bg-white rounded-lg p-6">
          <div className="text-2xl font-semibold text-gray-900">
            <div className="font-bold my-1">{post.title}</div>
          </div>
          <div className="text-sm text-slate-400 mb-4">
            <span className="mr-2">{post.writer}</span>
            <span className="mr-2">{formatRegDateV1(post.regDate)}</span>
            <Button text={'목록'} type={'UPDATE'} onClick={goToList} />
            {isAuthenticated ? (
              <>
                <Button text={'수정'} type={'UPDATE'} onClick={onUpdatePost} />
                <Button text={'삭제'} type={'DELETE'} onClick={onDeletePost} />
              </>
            ) : null}
          </div>
          <div className="text-md text-gray-700" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPost;
