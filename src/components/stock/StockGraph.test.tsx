import React from 'react';
import { render, screen } from '@testing-library/react';
import StockGraph from './StockGraph';
import StockContextProvider from '../store/stock-contex';

test('renders Stock Graph', () => {
  
  const stockData = {
    "c": [
      217.68,
      221.03,
      219.89
    ],
    "h": [
      222.49,
      221.5,
      220.94
    ],
    "l": [
      217.19,
      217.1402,
      218.83
    ],
    "o": [
      221.03,
      218.55,
      220
    ],
    "s": "ok",
    "t": [
      1569297600,
      1569384000,
      1569470400
    ],
    "v": [
      33463820,
      24018876,
      20730608
    ]
  };
  
  render(<StockContextProvider><StockGraph testData={stockData}/></StockContextProvider>);

  const graphElement = screen.getByText(/26-09-2019/i);
  expect(graphElement).toBeInTheDocument();

});
