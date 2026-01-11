export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const isoString = dateString.replace(/\./g, '-').replace(/ /g, 'T');

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    console.error('Failed to parse date:', dateString);
    return null;
  }

  return date;
};

export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateDot = (dateString: string): string => {
  const date = parseDate(dateString);
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const formatDday = (dday: number | null | undefined): string => {
  if (dday == null) {
    return '마감';
  }

  const numDday = Number(dday);

  if (isNaN(numDday)) {
    console.error('Invalid dday value:', dday);
    return '마감';
  }

  if (numDday > 0) return `D-${numDday}`;
  if (numDday === 0) return 'D-DAY';
  return '마감';
};
