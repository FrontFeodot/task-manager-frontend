export const parseValueToClassName = (value: string): string =>
  value.split(' ').join('_');
