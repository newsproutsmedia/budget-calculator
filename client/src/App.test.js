import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByTestId('budgetHeading')).toHaveTextContent('Budget Calculator');
  expect(screen.getByTestId('budgetInput'));
  expect(screen.getByTestId('budgetSubmitBtn'));
});
