import React from 'react';

type ButtonType =
  | 'CREATE'
  | 'UPDATE'
  | 'SAVE'
  | 'CANCEL'
  | 'DELETE'
  | 'PREV'
  | 'NEXT'
  | 'CURRENT'
  | 'DISABLE'
  | 'DEFAULT';

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {
  const buttonStyles = {
    CREATE:
      'bg-black text-sm text-white font-medium rounded-lg shadow-md py-2 px-4 transition-transform transform hover:scale-105',
    UPDATE: 'text-blue-600 text-base mx-2',
    SAVE: 'bg-black text-sm text-white font-medium rounded-lg shadow-md py-2 px-4 transition-transform transform hover:scale-105',
    CANCEL:
      'bg-slate-400 text-white font-medium rounded-lg shadow-md py-2 px-4 transition-transform transform hover:scale-105',
    DELETE: 'text-blue-600 text-base mx-2',
    PREV: 'text-black hover:bg-teal-400 font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    NEXT: 'text-black hover:bg-teal-400 font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    CURRENT:
      'bg-teal-400 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    DISABLE: 'bg-white text-white pointer-events-none',
    DEFAULT:
      'text-black hover:bg-teal-400 hover:text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
  };

  const buttonClass = buttonStyles[type] || buttonStyles.DEFAULT;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
