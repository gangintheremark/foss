const Button = ({ text, onClick }) => {
  return (
    <button className="w-full text-center p-4" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
