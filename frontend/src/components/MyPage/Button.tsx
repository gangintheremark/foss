import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="w-full text-center p-4" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
