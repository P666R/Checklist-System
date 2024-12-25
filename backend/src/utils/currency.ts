export const parseCurrencyString = (value: string): number => {
  return Number(value.replace(/[£,]/g, ''));
};
