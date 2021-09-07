export type CellCoordinates = {
  rowIndex: number;
  cellIndex: number;
};

export type Cell = {
  hasMine?: boolean;
  hasFlag: boolean;
  rowIndex: number;
  cellIndex: number;
  closeMines?: number;
};

export type Row = Cell[];

export type Boards = {
  [key: string]: {
    id: string;
    rows: Row[];
    gameFinished: boolean;
    win: boolean;
    loose: boolean;
  };
};

export type MineMap = {
  [key: string]: string[];
};
