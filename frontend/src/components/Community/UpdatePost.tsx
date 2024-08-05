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
        nav('/community');
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  };

  // 게시글 수정 취소
  const onCancelPost = () => {
    nav(`/community/${id}`);
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
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <Nav />
        </div>

        {/* 제목 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={onChangeTitle}
            ref={titleRef}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="게시글 제목을 입력하세요"
          />
          {errors?.title && <p className="text-red-600 mt-2 text-sm">{errors.title}</p>}
        </div>

        {/* 글쓴이 */}
        <div className="mb-4">
          <label htmlFor="writer" className="block text-lg font-medium text-gray-700 mb-2">
            글쓴이
          </label>
          <input
            id="writer"
            type="text"
            value={writer}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
          />
        </div>

        {/* 작성일 */}
        <div className="mb-4">
          <label htmlFor="regDate" className="block text-lg font-medium text-gray-700 mb-2">
            작성일
          </label>
          <input
            id="regDate"
            type="text"
            value={formatRegDateV1(regDate)}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
          />
        </div>

        {/* 내용 */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={onChangeContent}
            ref={contentRef}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="게시글 내용을 입력하세요"
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
