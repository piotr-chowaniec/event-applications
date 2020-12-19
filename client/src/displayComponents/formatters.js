import { parseISO, format } from 'date-fns';

export const transformToDate = (date, dateFormat = 'PPPP') => {
  const parsedIsoDate = parseISO(date);
  return format(parsedIsoDate, dateFormat);
};
