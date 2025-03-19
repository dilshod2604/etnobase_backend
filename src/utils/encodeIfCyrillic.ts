export const encodeIfCyrillic = (str: string): string => {
  return /[а-яА-ЯЁё]/.test(str) ? encodeURIComponent(str) : str;
};
