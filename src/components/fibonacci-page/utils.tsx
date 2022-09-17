export const getArr = (arr: number[], count: number): number[] | null => {
  if (arr.length <= 0) {
    return null;
  }
  return arr.filter((el, index) => index < count && index !== 0);
};

export const getFibonacciNumbers = (num: number) => {
  const arr: number[] = [0, 1];
  if (num > 0) {
    for (let i = 2; i < num + 2; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
  }
  return arr;
}

