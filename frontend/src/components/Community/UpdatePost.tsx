import Swal from 'sweetalert2';
import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';
import Nav from '@/components/Header/NavComponent';

import { formatRegDateV1 } from '@/components/Community/util/formatRegDate';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState<string>('');
  const [writer, setWriter] = useState<string>();
  const [content, setContent] = useState<string>('');
  const [regDate, setRegDate] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 빈 문자열 입력 방지
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>();

  const nav = useNavigate();

  // 렌더링 시 게시글 조회
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/community/${id}`);
        const post = response.data;
        if (post) {
          setTitle(post.title);
          setWriter(post.writer);
          setContent(post.content);
          setRegDate(post.regDate);
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

  // 게시글 생성
  const onUpdatePost = () => {
    // 빈 문자열 입력 방지
    let hasError = false;
    const newErrors: { title?: string; content?: string } = {};

    if (!content.trim()) {
      newErrors.content = '내용을 입력해 주세요.';
      hasError = true;
      if (contentRef.current) contentRef.current.focus();
    }
    if (!title.trim()) {
      newErrors.title = '제목을 입력해 주세요.';
      hasError = true;
      if (titleRef.current) titleRef.current.focus();
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // 게시글 서버에 전송
    const fetchPost = async () => {
      try {
        await apiClient.put(`/community/${id}`, {
          title: title,
          content: content,
        });
        Swal.fire({
          html: '<b>수정이 완료되었습니다.</b>',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          nav(`/community/${id}`);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  };

  const onCancelPost = () => {
    Swal.fire({
      html: `수정을 취소하시겠습니까?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 취소합니다',
      cancelButtonText: '아니요, 유지합니다',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        nav(`/community/${id}`);
      }
    });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, content: '' }));
  };

  // 로딩 안됐으면 로딩 스피너 렌더링
  if (loading) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="mb-6">
        <Nav />
      </div>
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <input
            id="title"
            type="text"
            value={title}
            onChange={onChangeTitle}
            ref={titleRef}
            className="w-full p-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="제목에 핵심 내용을 요약해보세요"
            maxLength={30}
          />
          {errors?.title && <p className="text-red-600 mt-2 text-sm">{errors.title}</p>}
        </div>
        <div className="mb-6">
          <textarea
            id="content"
            value={content}
            onChange={onChangeContent}
            ref={contentRef}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:outline-none resize-none"
            placeholder="면접 관련 내용을 남겨주세요. 상세히 작성하면 더 좋아요😇"
            maxLength={1000}
            rows={13}
          />
          {errors?.content && <p className="text-red-600 mt-2 text-sm">{errors.content}</p>}
        </div>

        {isAuthenticated ? (
          <div className="flex gap-4 justify-end">
            <Button text={'저장'} type={'SAVE'} onClick={onUpdatePost} />
            <Button text={'취소'} type={'CANCEL'} onClick={onCancelPost} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UpdatePost;
