import { zonedTimeToUtc, format } from 'date-fns-tz';

const formatDate = (date) => format(date, 'yyyy-MM-dd HH:mm:ss.SSS');

const getClientTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const genCurrUTCTime = () => {
  const currDate = formatDate(new Date());
  const timeZone = getClientTimeZone();
  const utcDate = zonedTimeToUtc(currDate, timeZone);
  return utcDate.toISOString();
};
