import { render } from '@testing-library/react';
import App from '../../App';

describe('APP', () => {
  test('It should render App', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});