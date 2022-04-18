export const round = (numb: number, decimals: number = 0): number => {
  const multiplier = 10 ** decimals;
  return Math.round(numb * multiplier) / multiplier;
};

export const calcAverage = (items: number[]): number | undefined => {
  if (!items.length) return undefined;

  const sum = items.reduce((a, b) => a + b, 0);

  return round(sum / items.length, 2);
};

export const calcMedian = (items: number[]): number | undefined => {
  if (!items.length) return undefined;

  const sorted = [...items].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};
