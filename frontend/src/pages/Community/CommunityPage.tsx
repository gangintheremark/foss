import Nav from '@/components/Header/NavComponent';
import FreeBoardView from '@/components/Community/FreeBoardView';

const CommunityPage = () => {
  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <FreeBoardView />
    </div>
  );
};

export default CommunityPage;
