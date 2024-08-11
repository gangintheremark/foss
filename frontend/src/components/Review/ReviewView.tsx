import Nav from '@components/Header/NavComponent';
import ReviewList from '@components/Review/ReviewList';

const ReviewView = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <div>
          <Nav />
        </div>
        <div className="w-2/3 min-w-[1080px] relative min-h-[500px] mx-auto my-0">
          <div className="flex flex-col items-center mt-20">
            <div className="w-full">
              <ReviewList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewView;
