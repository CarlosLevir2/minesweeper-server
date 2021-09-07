import { v4 } from 'uuid';
import { createMineMap, getCloseMines, revelArea } from './functions';
import { Row, Boards, Cell, MineMap } from './types';

const BOARD_ROWS = 9;
const BOARD_COLUMNS = 9;

const boards: Boards = {};
const minesMap: MineMap = {};

export function createBoard() {
  try {
    const unfilledBoard: null[][] = Array.from(
      {
        length: BOARD_ROWS,
      },
      () => new Array(BOARD_COLUMNS).fill(null)
    );

    const rows: Row[] = unfilledBoard.map((row, rowIndex) => {
      return row.map((_cell, cellIndex) => {
        return {
          rowIndex: rowIndex,
          cellIndex: cellIndex,
          hasFlag: false,
        };
      });
    });

    const boardId = v4();

    boards[boardId] = {
      id: boardId,
      rows,
      gameFinished: false,
      win: false,
      loose: false,
    };

    minesMap[boardId] = createMineMap();

    return { board: boards[boardId] };
  } catch (err) {
    return { error: true };
  }
}

export function flagCell(boardId: string, cell: Cell) {
  try {
    const board = boards[boardId];

    if (!board) {
      throw new Error();
    }

    if (board.gameFinished) {
      return { board };
    }

    boards[boardId].rows[cell.rowIndex][cell.cellIndex].hasFlag = true;

    return { board: boards[boardId] };
  } catch (err) {
    return { error: true };
  }
}

export function revelCell(boardId: string, cell: Cell) {
  try {
    let remainingCellsCount = 0;
    const board = boards[boardId];

    if (!board) {
      throw new Error();
    }

    if (board.gameFinished) {
      return { board };
    }

    const hasMine = minesMap[boardId].some(
      (cellPosition) => cellPosition === `${cell.rowIndex}${cell.cellIndex}`
    );

    if (hasMine) {
      const reveledRows = board.rows.map((row) =>
        row.map((cell) => {
          if (!cell.closeMines) {
            remainingCellsCount++;
          }

          return {
            ...cell,
            hasMine: minesMap[boardId].some(
              (cellPosition) =>
                cellPosition === `${cell.rowIndex}${cell.cellIndex}`
            ),
            closeMines: getCloseMines(
              minesMap[boardId],
              cell.rowIndex,
              cell.cellIndex
            ),
          };
        })
      );

      boards[boardId] = {
        ...boards[boardId],
        rows: reveledRows,
        gameFinished: true,
        win: false,
        loose: true,
      };

      return { board: boards[boardId] };
    }

    const closeMines = getCloseMines(
      minesMap[boardId],
      cell.rowIndex,
      cell.cellIndex
    );

    board.rows[cell.rowIndex][cell.cellIndex].closeMines = closeMines;

    if (remainingCellsCount === minesMap[boardId].length) {
      boards[boardId] = {
        ...boards[boardId],
        gameFinished: true,
        win: true,
        loose: false,
      };
    }

    if (closeMines === 0) {
      boards[boardId].rows = revelArea(
        minesMap[boardId],
        cell.rowIndex,
        cell.cellIndex,
        boards[boardId].rows
      );
    }

    return { board: boards[boardId] };
  } catch (err) {
    return { error: true };
  }
}

export function getBoard(boardId: string) {
  try {
    const board = boards[boardId];

    if (!board) {
      throw new Error();
    }

    return { board };
  } catch (err) {
    return { error: true };
  }
}
