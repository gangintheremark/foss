import apiClient from '@/utils/util';
import Button from '@/components/Community/Button';
import Loading from '@/components/common/Loading';

import { Post } from '@/types/board';

import { formatRegDateV2 } from '@/components/Community/util/formatRegDate';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FreeBoardView = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 여부
  const [posts, setPosts] = useState<Post[]>([]); // 현재 페이지의 게시글 목록
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 번호
  const location = useLocation(); // 현재 위치(url)

  const [inputPage, setInputPage] = useState<string>(''); // 페이지 이동 입력값
  const inputPageRef = useRef<HTMLInputElement>(null); // 페이지 이동 입력란 참조

  const nav = useNavigate(); // 네비게이터

  // 페이지 이동시 현재 페이지 갱신
  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
    setInputPage(page.toString());
  }, [location.search]);

  // 현재 페이지 갱신후 게시글 목록 데이터 받아오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/community', {
          params: { page: currentPage, size: 5 },
        });
        const { content, totalPages } = response.data;

        setPosts(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  // 페이지 이동 입력란 포커스 제거
  useEffect(() => {
    if (inputPageRef.current) {
      inputPageRef.current.blur();
    }
  }, [currentPage]);

  // 게시글 작성
  const onCreatePost = () => {
    nav('/community/create');
  };

  // 페이지 이동
  const onChangePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    nav(`/community?page=${pageNumber}`);
  };

  // 페이지네이션 버튼 생성
  const renderPagination = () => {
    const pageButtons = [];

    // 페이지 수가 적을 경우
    if (totalPages <= 13) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            text={i.toString()}
            type={i === currentPage ? 'CURRENT' : 'DEFAULT'}
            onClick={() => onChangePage(i)}
          />
        );
      }
      return pageButtons;
    }

    // 페이지네이션에서 중간 구간의 시작과 끝 및 ... 처리
    let startPage = currentPage - 3;
    let endPage = currentPage + 3;
    let prevEllipsis = true;
    let nextEllipsis = true;

    // 예외처리
    if (startPage < 5) {
      startPage = 3;
      endPage = 10;
      prevEllipsis = false;
    } else if (endPage > totalPages - 4) {
      startPage = totalPages - 9;
      endPage = totalPages - 2;
      nextEllipsis = false;
    }

    // 앞쪽 페이지
    pageButtons.push(
      <Button
        key={1}
        text={'1'}
        type={1 === currentPage ? 'CURRENT' : 'DEFAULT'}
        onClick={() => onChangePage(1)}
      />
    );
    pageButtons.push(
      <Button
        key={2}
        text={'2'}
        type={2 === currentPage ? 'CURRENT' : 'DEFAULT'}
        onClick={() => onChangePage(2)}
      />
    );
    if (prevEllipsis) {
      pageButtons.push(<Button key={-Infinity} text={'...'} type={'DEFAULT'} onClick={() => {}} />);
    }

    // 중간 페이지
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          text={i.toString()}
          type={i === currentPage ? 'CURRENT' : 'DEFAULT'}
          onClick={() => onChangePage(i)}
        />
      );
    }

    // 뒤쪽 페이지
    if (nextEllipsis) {
      pageButtons.push(<Button key={Infinity} text={'...'} type={'DEFAULT'} onClick={() => {}} />);
    }
    pageButtons.push(
      <Button
        key={totalPages - 1}
        text={(totalPages - 1).toString()}
        type={totalPages - 1 === currentPage ? 'CURRENT' : 'DEFAULT'}
        onClick={() => onChangePage(totalPages - 1)}
      />
    );
    pageButtons.push(
      <Button
        key={totalPages}
        text={totalPages.toString()}
        type={totalPages === currentPage ? 'CURRENT' : 'DEFAULT'}
        onClick={() => onChangePage(totalPages)}
      />
    );

    return pageButtons;
  };

  // 직접 페이지 이동 상태관리
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  // 직접 페이지 이동 이벤트처리
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isNaN(parseInt(inputPage))) {
      onChangePage(parseInt(inputPage));
    }
  };

  // 로딩 안됐으면 로딩 스피너 렌더링
  if (loading || posts === undefined) {
    return (
      <div className="w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {/* 게시판 이름 */}
      <div className="absolute top-[100px] text-4xl font-bold left-1/2 transform -translate-x-1/2">
        자유 게시판
      </div>

      {/* 게시판 몸통 */}
      <div className="flex justify-center mt-[200px]">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] divide-y divide-teal-200 bg-white shadow-md rounded-lg">
            <thead className="bg-teal-100 text-teal-600">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase text-center w-[120px]">
                  번호
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-center w-[500px]">
                  제목
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-center w-[150px]">
                  글쓴이
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-center w-[150px]">
                  작성일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-teal-200">
              {posts.map((post) => (
                <tr
                  key={post.postId}
                  className="cursor-pointer hover:bg-teal-50 transition-colors"
                  onClick={() => nav(`/community/${post.postId}`)}
                >
                  <td className="px-6 py-4 text-sm text-teal-900 text-center">{post.postId}번</td>
                  <td className="px-6 py-4 text-sm text-teal-700 text-center">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-teal-700 text-center">{post.writer}</td>
                  <td className="px-6 py-4 text-sm text-teal-700 text-center">
                    {formatRegDateV2(post.regDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-[100px]">
        <div className="flex gap-2">
          <Button
            text={'<<'}
            type={currentPage === 1 ? 'DISABLE' : 'PREV'}
            onClick={() => onChangePage(1)}
          />
          <Button
            text={'<'}
            type={currentPage === 1 ? 'DISABLE' : 'PREV'}
            onClick={() => onChangePage(currentPage - 1)}
          />
          {renderPagination()}
          <Button
            text={'>'}
            type={currentPage === totalPages ? 'DISABLE' : 'NEXT'}
            onClick={() => onChangePage(currentPage + 1)}
          />
          <Button
            text={'>>'}
            type={currentPage === totalPages ? 'DISABLE' : 'NEXT'}
            onClick={() => onChangePage(totalPages)}
          />
        </div>
      </div>

      {/* 페이지 표시 및 글 쓰기 버튼 */}
      <div className="flex justify-between items-center mt-8 px-8">
        {/* 페이지 이동 입력란 */}
        <div className="flex-1 flex justify-center">
          <div className="w-48 flex items-center space-x-2 border rounded-lg px-4 py-2 bg-white shadow-md">
            <input
              value={inputPage}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              ref={inputPageRef}
              className="w-16 p-1 border rounded-md text-center"
            />
            <span>/</span>
            <span className="w-16 p-1 border rounded-md text-center">{totalPages}</span>
          </div>
        </div>

        {/* 글 쓰기 버튼 */}
        <div>
          <Button text={'글 쓰기'} type={'CREATE'} onClick={onCreatePost} />
        </div>
      </div>
    </div>
  );
};

export default FreeBoardView;
