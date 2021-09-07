import { Request, Response } from 'express';

import * as boardModel from '../../model/board/board';

export function createBoard(_req: Request, res: Response) {
  const { error, board } = boardModel.createBoard();

  if (error) {
    res.status(500).send('An error occurred');
  }

  return res.json({ board });
}

export function revelCell(req: Request, res: Response) {
  const { board, error } = boardModel.revelCell(
    req.params.boardId,
    req.body.cell
  );

  if (error) {
    return res.status(500).send('An error occurred');
  }

  res.json({ board });
}

export function flagCell(req: Request, res: Response) {
  const { board, error } = boardModel.flagCell(
    req.params.boardId,
    req.body.cell
  );

  if (error) {
    return res.status(500).send('An error occurred');
  }

  res.json({ board });
}

export function getBoard(req: Request, res: Response) {
  const { board, error } = boardModel.getBoard(req.params.boardId);

  if (error) {
    return res.status(500).send('An error occurred');
  }

  return res.json(board);
}
