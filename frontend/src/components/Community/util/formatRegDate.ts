export const formatRegDateV1 = (regDate: string) => {
  const date = new Date(regDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return date.toLocaleString('sv-SE', options).replace(',', '');
};

export const formatRegDateV2 = (regDate: string) => {
  const today = new Date();
  const todayString = today.toDateString();

  const checkDate = new Date(regDate);
  const checkDateString = checkDate.toDateString();

  const options1: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const options2: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (todayString === checkDateString) {
    return checkDate.toLocaleString('sv-SE', options1).replace(',', '');
  } else {
    return checkDate.toLocaleString('sv-SE', options2).replace(',', '');
  }
};
