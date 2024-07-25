import Stars from './Stars';

const ReviewModal = ({ star, onChangeStar }) => {
  const onSaveReview = () => {
    console.log(`${star}점`);
  };

  return (
    <>
      <div className="text-center p-4 border">
        <div className="p-4">당신의 별점은?</div>
        <Stars star={star} onChangeStar={onChangeStar} />
        <button onClick={onSaveReview} className="bg-[#00FFFF] m-4">
          별점 등록
        </button>
      </div>
      <div>{star}점</div>
    </>
  );
};

export default ReviewModal;
