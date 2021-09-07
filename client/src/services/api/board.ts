import { api } from '.';
import { Board, Cell } from '../../common/types/api';

export const getBoard = (boardId: string) => api.get<Board>(`board/${boardId}`);

export const createBoard = () => api.post<{ board: Board }>('board');

export const revelCell = (boardId: string, cell: Cell) =>
  api.put<{ board: Board }>(`board/${boardId}/revel`, {
    cell,
  });

export const flagCell = (boardId: string, cell: Cell) =>
  api.put<{ board: Board }>(`board/${boardId}/flag`, {
    cell,
  });
