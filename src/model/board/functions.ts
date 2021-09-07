import { CellCoordinates, Row } from './types';

const MINE_COUNT = 9;

export function createMineMap() {
  const mineArray = Array(MINE_COUNT).fill(null);

  const mineMap = mineArray.map(
    () =>
      `${Math.floor(Math.random() * MINE_COUNT) + 1}${
        Math.floor(Math.random() * MINE_COUNT) + 1
      }`
  );

  return mineMap;
}

export function getCloseMines(
  mineMap: string[],
  rowIndex: number,
  cellIndex: number
) {
  const closeCell1 =
    rowIndex > 0 && cellIndex > 0
      ? mineMap.some((mine) => mine === `${rowIndex - 1}${cellIndex - 1}`)
      : false;
  const closeCell2 =
    rowIndex > 0
      ? mineMap.some((mine) => mine === `${rowIndex - 1}${cellIndex}`)
      : false;
  const closeCell3 =
    rowIndex > 0 && cellIndex + 1 < 9
      ? mineMap.some((mine) => mine === `${rowIndex - 1}${cellIndex + 1}`)
      : false;
  const closeCell4 =
    cellIndex > 0
      ? mineMap.some((mine) => mine === `${rowIndex}${cellIndex - 1}`)
      : false;
  const closeCell5 =
    cellIndex + 1 < 9
      ? mineMap.some((mine) => mine === `${rowIndex}${cellIndex + 1}`)
      : false;
  const closeCell6 =
    rowIndex + 1 < 9 && cellIndex > 0
      ? mineMap.some((mine) => mine === `${rowIndex + 1}${cellIndex - 1}`)
      : false;
  const closeCell7 =
    rowIndex + 1 < 9
      ? mineMap.some((mine) => mine === `${rowIndex + 1}${cellIndex}`)
      : false;

  const closeCell8 =
    rowIndex + 1 < 9 && cellIndex + 1 < 9
      ? mineMap.some((mine) => mine === `${rowIndex + 1}${cellIndex + 1}`)
      : false;

  const closeMines = [
    closeCell1,
    closeCell2,
    closeCell3,
    closeCell4,
    closeCell5,
    closeCell6,
    closeCell7,
    closeCell8,
  ].filter(Boolean).length;

  return closeMines;
}

export function revelArea(
  mineMap: string[],
  rowIndex: number,
  cellIndex: number,
  rows: Row[]
) {
  const rowIndex1 = rowIndex - 1;
  const cellIndex1 = cellIndex - 1;
  const closeCellPosition1 =
    rowIndex > 0 &&
    cellIndex > 0 &&
    typeof rows[rowIndex1][cellIndex1].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex1, cellIndex1) === 0
      ? { rowIndex: rowIndex1, cellIndex: cellIndex1 }
      : false;

  const rowIndex2 = rowIndex - 1;
  const cellIndex2 = cellIndex;
  const closeCellPosition2 =
    rowIndex > 0 &&
    cellIndex > 0 &&
    typeof rows[rowIndex2][cellIndex2].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex2, cellIndex2) === 0
      ? { rowIndex: rowIndex2, cellIndex: cellIndex2 }
      : false;

  const rowIndex3 = rowIndex - 1;
  const cellIndex3 = cellIndex + 1;
  const closeCellPosition3 =
    rowIndex > 0 &&
    cellIndex3 < 9 &&
    typeof rows[rowIndex3][cellIndex3].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex3, cellIndex3) === 0
      ? { rowIndex: rowIndex3, cellIndex: cellIndex3 }
      : false;

  const rowIndex4 = rowIndex;
  const cellIndex4 = cellIndex - 1;
  const closeCellPosition4 =
    cellIndex > 0 &&
    typeof rows[rowIndex4][cellIndex4].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex4, cellIndex4) === 0
      ? { rowIndex: rowIndex4, cellIndex: cellIndex4 }
      : false;

  const rowIndex5 = rowIndex;
  const cellIndex5 = cellIndex + 1;
  const closeCellPosition5 =
    cellIndex5 < 9 &&
    typeof rows[rowIndex5][cellIndex5].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex5, cellIndex5) === 0
      ? { rowIndex: rowIndex5, cellIndex: cellIndex5 }
      : false;

  const rowIndex6 = rowIndex + 1;
  const cellIndex6 = cellIndex - 1;
  const closeCellPosition6 =
    cellIndex > 0 &&
    rowIndex6 < 9 &&
    typeof rows[rowIndex6][cellIndex6].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex6, cellIndex6) === 0
      ? { rowIndex: rowIndex6, cellIndex: cellIndex6 }
      : false;

  const rowIndex7 = rowIndex + 1;
  const cellIndex7 = cellIndex;
  const closeCellPosition7 =
    rowIndex7 < 9 &&
    typeof rows[rowIndex7][cellIndex7].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex7, cellIndex7) === 0
      ? { rowIndex: rowIndex7, cellIndex: cellIndex7 }
      : false;

  const rowIndex8 = rowIndex + 1;
  const cellIndex8 = cellIndex + 1;
  const closeCellPosition8 =
    rowIndex8 < 9 &&
    cellIndex8 < 9 &&
    typeof rows[rowIndex8][cellIndex8].closeMines !== 'number' &&
    getCloseMines(mineMap, rowIndex8, cellIndex8) === 0
      ? { rowIndex: rowIndex8, cellIndex: cellIndex8 }
      : false;

  const freeCells = [
    closeCellPosition1,
    closeCellPosition2,
    closeCellPosition3,
    closeCellPosition4,
    closeCellPosition5,
    closeCellPosition6,
    closeCellPosition7,
    closeCellPosition8,
  ].filter(Boolean) as CellCoordinates[];

  if (freeCells.length === 0) return rows;

  freeCells.forEach(({ rowIndex, cellIndex }) => {
    rows[rowIndex][cellIndex] = {
      ...rows[rowIndex][cellIndex],
      closeMines: 0,
    };
  });

  let newRows = rows;

  freeCells.forEach(({ rowIndex, cellIndex }) => {
    newRows = revelArea(mineMap, rowIndex, cellIndex, rows);
  });

  return newRows;
}
