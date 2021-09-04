import { Request, Response } from 'express';

import * as boardModel from '../../model/board/board';

export function createBoard(req: Request, res: Response) {
  const { board, error } = boardModel.createBoard();

  if (error) {
    res.status(500).send('An error occurred');
  }

  res.send(board);
}

export function revelCell(req: Request, res: Response) {
  const { board, gameFinished, win, loose, error } = boardModel.revelCell(
    req.params.boardId,
    req.body.cell
  );

  if (error) {
    res.status(500).send('An error occurred');
  }

  res.send({ board, gameFinished, win, loose });
}

export function getBoard(req: Request, res: Response) {
  const { board, error } = boardModel.getBoard(req.params.boardId);

  if (error) {
    res.status(500).send('An error occurred');
  }

  res.send(board);
}
