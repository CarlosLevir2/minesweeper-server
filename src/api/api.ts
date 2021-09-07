import registerBoardRoutes from './board/board';

import express from 'express';
const routes = express.Router();

registerBoardRoutes(routes);

export default routes;
