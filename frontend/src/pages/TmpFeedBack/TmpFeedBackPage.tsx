import Nav from '@/components/Header/NavComponent';
import TmpFeedBackView from './TmpFeedBackView';

const TmpFeedBackPage = () => {
  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <TmpFeedBackView />
    </div>
  );
};

export default TmpFeedBackPage;
