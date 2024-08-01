const Button = ({ text, type, onClick }) => {
  const buttonStyles = {
    CREATE:
      'bg-blue-500 hover:bg-blue-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 px-4',
    UPDATE:
      'bg-blue-500 hover:bg-blue-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 px-4',
    SAVE: 'bg-blue-500 hover:bg-blue-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 px-4',
    CANCEL:
      'bg-red-500 hover:bg-red-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 py-2 px-4',
    DELETE:
      'bg-red-500 hover:bg-red-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 py-2 px-4',
    DEFAULT:
      'bg-green-500 hover:bg-green-600 text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 py-2 px-4',
  };

  const buttonClass = buttonStyles[type] || buttonStyles.DEFAULT;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
