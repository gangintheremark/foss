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
      'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    UPDATE:
      'bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    SAVE: 'bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    CANCEL:
      'bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    DELETE:
      'bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    PREV: 'bg-blue-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    NEXT: 'bg-blue-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    CURRENT:
      'bg-blue-500 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
    DISABLE:
      'bg-blue-300 text-blue-700 font-medium rounded-lg shadow-md cursor-not-allowed py-2 px-4 transition-transform transform',
    DEFAULT:
      'bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 py-2 px-4 transition-transform transform hover:scale-105',
  };

  const buttonClass = buttonStyles[type] || buttonStyles.DEFAULT;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
