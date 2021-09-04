import express from 'express';
import routes from './api/api';

const app = express();

app.use(routes);

app.listen(process.env.PORT || 8000);
