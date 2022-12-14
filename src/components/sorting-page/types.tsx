export interface IElements {
  arr: Array<number[]>;
  comparable: Array<number[]>;
  notsorted: Array<number[]>;
  sorted: Array<number[]>;
}

export interface IElement {
  arr: number[];
  comparable: number[];
  notsorted: number[];
  sorted: number[];
}

export interface IButtonState {
  upButton: {
    disabled: boolean,
    loading: boolean
  },
  downButton: {
    disabled: boolean,
    loading: boolean
  },
  arrButton: {
    disabled: boolean
  }
}