import { render, waitFor } from '@testing-library/react';
import nock from 'nock';
import Main from '../../../../pages/Main';

const unfilledBoard: null[][] = Array.from(
  {
    length: 9,
  },
  () => new Array(9).fill(null)
);

const rows = unfilledBoard.map((row, rowIndex) => {
  return row.map((_cell, cellIndex) => {
    return {
      rowIndex: rowIndex,
      cellIndex: cellIndex,
      hasFlag: false,
    };
  });
});

const baseApiPath = 'http://localhost:8000';

nock(baseApiPath).persist().defaultReplyHeaders({
  'access-control-allow-origin': '*',
}).post('/board').reply(200, {
  board: {
    id: '12',
    rows: rows,
    gameFinished: true,
    win: true,
    loose: false
  }
});

describe('Main', () => {
  test('It should render App', () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });

  test('It should show create new game button', async () => {
    const { getByText } = render(<Main />);
    const button = getByText('Start a new game!');
    expect(button).toBeInTheDocument()
  });

  test('It should show win message', async () => {
    const { getByText } = render(<Main />);

    await waitFor(() => expect(getByText('You won!')).toBeInTheDocument())
  });
});