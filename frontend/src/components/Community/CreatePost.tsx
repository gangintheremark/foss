import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Nav from '@/components/Header/NavComponent';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>();

  const nav = useNavigate();

  const onCreatePost = () => {
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
    const inputValue = e.target.value;
    setContent(inputValue);

    const lines = inputValue.split('\n');
    let consecutiveLineBreaks = 0;
    let hasError = false;

    for (const line of lines) {
      if (line === '') {
        consecutiveLineBreaks++;
        if (consecutiveLineBreaks >= 5) {
          hasError = true;
          break;
        }
      } else {
        consecutiveLineBreaks = 0;
      }
    }

    if (hasError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        content: '연속된 줄바꿈은 최대 4번까지만 가능합니다.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, content: '' }));
    }
  };

  const onKeyDownContent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const lines = content.split('\n');
      let consecutiveLineBreaks = 0;

      for (const line of lines) {
        if (line === '') {
          consecutiveLineBreaks++;
          if (consecutiveLineBreaks >= 4) {
            e.preventDefault();
            setErrors((prevErrors) => ({
              ...prevErrors,
              content: '연속된 줄바꿈은 최대 4번까지만 가능합니다.',
            }));
            return;
          }
        } else {
          consecutiveLineBreaks = 0;
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
        <div className="w-full max-w-2xl bg-white rounded-xl px-6">
          <div className="mb-3">
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
            {errors?.title && <p className="text-red-500 mt-2 text-sm">{errors.title}</p>}
          </div>
          <div className="mb-6">
            <textarea
              id="content"
              value={content}
              onChange={onChangeContent}
              onKeyDown={onKeyDownContent}
              ref={contentRef}
              className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:outline-none resize-none"
              placeholder="면접 관련 내용을 남겨주세요. 상세히 작성하면 더 좋아요😇"
              maxLength={1000}
              rows={13}
            />
            {errors?.content && <p className="text-red-500 mt-2 text-sm">{errors.content}</p>}
          </div>
          <div className="flex justify-end">
            <Button text={'저장'} type={'CREATE'} onClick={onCreatePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
