import { IButtonState } from "./types";

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

export const defaultState = {
  arr: [],
  comparable: [],
  notsorted: [],
  sorted: [],
}

export const defaultButtonState: IButtonState = {
  upButton: {
    disabled: false,
    loading: false
  },
  downButton: {
    disabled: false,
    loading: false
  },
  arrButton: {
    disabled: false
  }
}