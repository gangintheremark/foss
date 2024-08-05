import Nav from '@/components/Header/NavComponent';
import FreeBoardView from '@/pages/Community/FreeBoardView';

const CommunityPage = () => {
  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      {/* 자유게시판 렌더링 */}
      <FreeBoardView />
    </div>
  );
};

export default CommunityPage;
