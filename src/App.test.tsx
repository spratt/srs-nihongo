import { render } from '@testing-library/react';
import App from './App';

test('renders SRS app', (): void => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/S.R.S. 日本語/i);
  expect(titleElement).toBeInTheDocument();
});
