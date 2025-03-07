import { format } from 'date-fns';

export const formatDate = (date: Date, dateFormat: string): string =>
  format(new Date(date), dateFormat);
