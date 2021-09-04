import { Router } from 'express';
import { createBoard, revelCell, getBoard } from '../../app/board/board';

function registerBoardRoutes(routes: Router) {
  routes.route('/board').post(createBoard);

  routes.route('/board/:boardId').put(revelCell).get(getBoard);
}

export default registerBoardRoutes;
