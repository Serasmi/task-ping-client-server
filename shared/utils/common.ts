export const undefinedJsonReplacer = (key: string, value: any) => {
  return value === undefined ? null : value;
};
