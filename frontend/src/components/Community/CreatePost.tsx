import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Nav from '@/components/Header/NavComponent';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // 빈 문자열 입력 방지
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>();

  const nav = useNavigate();

  // 게시글 생성
  const onCreatePost = () => {
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
        await apiClient.post(`/community`, {
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

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, content: '' }));
  };

  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white border border-gray-300 shadow-lg rounded-xl p-6">
          {/* 제목 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-xl font-semibold text-gray-900 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={onChangeTitle}
              ref={titleRef}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="게시글 제목을 입력하세요"
            />
            {errors?.title && <p className="text-red-500 mt-2 text-sm">{errors.title}</p>}
          </div>

          {/* 내용 */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-xl font-semibold text-gray-900 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={onChangeContent}
              ref={contentRef}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="게시글 내용을 입력하세요"
              rows={6}
            />
            {errors?.content && <p className="text-red-500 mt-2 text-sm">{errors.content}</p>}
          </div>

          {/* 제출 */}
          <div className="flex justify-end">
            <Button text={'저장'} type={'CREATE'} onClick={onCreatePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
