export const swap = (
  arr: number[],
  firstIndex: number,
  secondIndex: number
): number[] => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};