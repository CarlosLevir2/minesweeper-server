import { useEffect, useState } from "react";
import { Board, Cell } from "../../common/types/api";
import { getBoard, createBoard, revelCell, flagCell } from "../../services/api/board";
import * as S from "./styles";

const queryParams = new URLSearchParams(window.location.search);
const boardId = queryParams.get('id');

export default function Main() {
  const [board, setBoard] = useState<Board>();
  const [flagEnabled, setFlagEnabled] = useState(false);

  function pushToNewGame() {
    window.location.href = window.location.origin
  }

  useEffect(() => {
    async function handleCreateBoard() {
      try {
        const { data: { board } } = await createBoard();
        window.history.replaceState({}, document.title, `?id=${board.id}`);

        setBoard(board)
      } catch (err) {
        // err
      }
    };

    async function handleGetBoard() {
      try {
        const { data: board } = await getBoard(boardId!);
        setBoard(board)
      } catch (err) {
        pushToNewGame()
      }
    };

    boardId ? handleGetBoard() : handleCreateBoard();
  }, []);

  async function handleCellClick(cell: Cell) {
    if (board?.gameFinished) return;

    const callbackClick = flagEnabled ? flagCell : revelCell;

    const { data } = await callbackClick(board!.id, cell);
    setBoard(data.board);
  }


  return (
    <S.Board>
      <S.RowContainer>
        {board?.gameFinished && (
          <S.Result win={board.win}>{board.win ? 'You won!' : 'You loose!'}</S.Result>
        )}
        {
          board?.rows?.map((row, rowIndex) => (
            <S.Row key={`Row-${rowIndex}`}>
              {row.map((cell, index) => (
                <S.Cell key={`Cell-${index}`} onClick={() => handleCellClick(cell)} hasMine={Boolean(cell.hasMine)} hasFlag={cell.hasFlag} flagEnabled={flagEnabled}>
                  {cell.hasMine ? "M" : cell.closeMines}
                </S.Cell>
              ))}
            </S.Row>
          ))
        }
        <S.Details flagEnabled={flagEnabled}>
          <S.Cell hasFlag onClick={() => setFlagEnabled(prevFlagEnabled => !prevFlagEnabled)} /> Flag
        </S.Details>
        <S.Button onClick={pushToNewGame}>Start a new game!</S.Button>
      </S.RowContainer>
    </S.Board>
  );
}
