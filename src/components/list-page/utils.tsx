import { IButtonState, IData } from "./types";

export const defaultButtonState: IButtonState = {
  addInHead: {
    disabled: false,
    loading: false
  },
  addInTail: {
    disabled: false,
    loading: false
  },
  delFromHead: {
    disabled: false,
    loading: false
  },
  delFromTail: {
    disabled: false,
    loading: false
  },
  addByIndex: {
    disabled: false,
    loading: false
  },
  delByIndex: {
    disabled: false,
    loading: false
  },
}

export const defaultdataState: IData = {
  number: undefined,
  index: undefined,
  type: "",
}