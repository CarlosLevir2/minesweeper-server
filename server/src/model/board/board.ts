import { v4 } from 'uuid';
import { Board, Boards, Cell, MineMap } from './types';

const BOARD_ROWS = 9;
const BOARD_COLUMNS = 9;
const MINE_COUNT = 9;

const boards: Boards = {};
const minesMap: MineMap = {};

function createMineMap() {
  const mineArray = Array(MINE_COUNT);

  const mineMap = mineArray.map(
    () =>
      `${Math.floor(Math.random() * MINE_COUNT) + 1}${
        Math.floor(Math.random() * MINE_COUNT) + 1
      }`
  );

  return mineMap;
}

export function createBoard() {
  try {
    const unfilledBoard: [][] = Array(BOARD_ROWS).fill(Array(BOARD_COLUMNS));

    const board: Board = unfilledBoard.map((row, rowIndex) =>
      row.map((_cell, cellIndex) => ({
        rowIndex: rowIndex,
        cellIndex: cellIndex,
        hasFlag: false,
        reveled: false,
      }))
    );

    const boardId = v4();

    boards[boardId] = board;
    minesMap[boardId] = createMineMap();

    return { board: unfilledBoard, error: false };
  } catch (err) {
    return { error: true };
  }
}

export function revelCell(boardId: string, cell: Cell) {
  try {
    const board = boards[boardId];

    if (!board) {
      throw new Error();
    }

    board[cell.rowIndex][cell.cellIndex].reveled = true;

    const hasMine = minesMap[boardId].some(
      (cellPosition) => cellPosition === `${cell.rowIndex}${cell.cellIndex}`
    );

    boards[boardId] = board;

    if (hasMine) {
      return {
        board,
        gameFinished: true,
        win: false,
        loose: true,
        error: false,
      };
    }

    return {
      board,
      gameFinished: false,
      win: false,
      loose: false,
      error: false,
    };
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

    const reveledBoard = board.map((row, rowIndex) =>
      row.map((cell) => ({
        ...cell,
        hasMine: minesMap[boardId].some(
          (cellPosition) => cellPosition === `${cell.rowIndex}${cell.cellIndex}`
        ),
      }))
    );

    return { board: reveledBoard, error: false };
  } catch (err) {
    return { error: true };
  }
}
