import { Router } from 'express';
import {
  createBoard,
  revelCell,
  getBoard,
  flagCell,
} from '../../app/board/board';

function registerBoardRoutes(routes: Router) {
  routes.route('/board').post(createBoard);
  routes.route('/board/:boardId').get(getBoard);

  routes.route('/board/:boardId/revel').put(revelCell);
  routes.route('/board/:boardId/flag').put(flagCell);
}

export default registerBoardRoutes;
