import { ElementStates } from "../../types/element-states";

export interface IColor {
  color?: ElementStates;
  index?: number | undefined;
}

export interface IButtonState {
  add: boolean
  delete: boolean
  clear: boolean
}