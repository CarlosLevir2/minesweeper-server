import { render } from '@testing-library/react';
import Main from '../../../../pages/Main';

describe('APP', () => {
  test('It should render App', () => {
    const { container } = render(<Main />);
    expect(container).toMatchSnapshot();
  });
});