import Nav from '@/components/Header/NavComponent';
import ReviewModal from '@/components/Review/ReviewModal';
import { useState } from 'react';

const CustomerSupportPage = () => {
  const [star, setStar] = useState(5);

  const onChangeStar = (pos: number) => {
    setStar(pos);
  };

  return (
    <>
      <Nav />
      <div>고객센터 페이지</div>
      <ReviewModal star={star} onChangeStar={onChangeStar} />
    </>
  );
};

export default CustomerSupportPage;
