export type Cell = {
  hasMine?: boolean;
  hasFlag: boolean;
  rowIndex: number;
  cellIndex: number;
  reveled: boolean;
  closeMines?: number;
};

export type Row = Cell[];

export type UnfilledBoard = [][];

export type Board = {
  id: string;
  rows: Row[];
  gameFinished: boolean;
  win: boolean;
  loose: boolean;
};

export type Boards = {
  [key: string]: {
    board: Board;
  };
};

export type MineMap = {
  [key: string]: string[];
};
