import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import StockContextProvider from './components/store/stock-contex';
import userEvent from '@testing-library/user-event';

test('renders initial App', () => {
  
  render(<StockContextProvider><App/></StockContextProvider>);

  const graphElement = screen.getByText(/No stock data/i);
  expect(graphElement).toBeInTheDocument();
});

test('check search stock', () => {

    render(<StockContextProvider><App/></StockContextProvider>);

    const stockNameElement = document.querySelector('#stockName');
    if(stockNameElement!== null){
        userEvent.type(stockNameElement, 'Tesla')
    }

    const searchButtonElement = document.querySelector('#searchButton');
    if(searchButtonElement!== null){
        userEvent.click(searchButtonElement);
    }
    
    const graphElement = screen.getByText(/No stock data/i);
    expect(graphElement).not.toBeInTheDocument();
  });