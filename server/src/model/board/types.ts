export type Cell = {
  hasMine?: boolean;
  hasFlag: boolean;
  rowIndex: number;
  cellIndex: number;
  reveled: boolean;
};

export type Board = Cell[][];

export type Boards = {
  [key: string]: Board;
};

export type MineMap = {
  [key: string]: string[];
};
