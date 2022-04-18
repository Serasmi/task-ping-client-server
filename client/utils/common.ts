export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface IAsyncDuration {
  date: number;
  duration: number;
}

export const measureAsyncDuration = async (
  clb: () => Promise<any>
): Promise<IAsyncDuration> => {
  const startDate = new Date();

  await clb();

  return {
    date: startDate.getTime(),
    duration: new Date().getTime() - startDate.getTime(),
  };
};
