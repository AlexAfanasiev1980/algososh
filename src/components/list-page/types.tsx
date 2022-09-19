export interface IData {
  number?: number | undefined | null;
  index?: number | undefined;
  type: "head" | "tail" | "delHead" | "delTail" | "AddIndex" | "DelIndex" | "";
}

export interface IButtonState {
  addInHead: {
    disabled: boolean
    loading: boolean
  },
  addInTail: {
    disabled: boolean
    loading: boolean
  },
  delFromHead: {
    disabled: boolean
    loading: boolean
  },
  delFromTail: {
    disabled: boolean
    loading: boolean
  },
  addByIndex: {
    disabled: boolean
    loading: boolean
  },
  delByIndex: {
    disabled: boolean
    loading: boolean
  }
}