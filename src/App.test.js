import React from 'react';
import ReactDOM from 'react-dom';
import App, {calcFV} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('calcFV', () => {
  it('should calculate a future value given an amount, a period of time and a rate of return', () => {
    expect(calcFV(1000, 0.05, 5)).toBe(true);
  });
});

