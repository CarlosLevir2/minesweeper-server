import express from 'express';
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
  return res.send('Coders Club by Carlos Levir');
});

app.listen(PORT);
