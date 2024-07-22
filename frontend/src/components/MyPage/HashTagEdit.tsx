import Button from './Button';

const HashTagEdit = ({ text, onClick }) => {
  return (
    <>
      <div className="flex">
        <div>{text}</div>
        <Button text="X" onClick={onClick} />
      </div>
    </>
  );
};

export default HashTagEdit;
