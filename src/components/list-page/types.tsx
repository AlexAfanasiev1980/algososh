export interface IData {
  number?: number | undefined | null;
  index?: number | undefined;
  type: "head" | "tail" | "delHead" | "delTail" | "AddIndex" | "DelIndex" | "";
}