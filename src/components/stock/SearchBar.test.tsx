import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders Search text input', () => {
  render(<SearchBar />);
  const stockNameElement = document.querySelector('#stockName');
  expect(stockNameElement).toBeInTheDocument();
});

test('renders Search from date input', () => {
  render(<SearchBar />);
  const fromDateElement = document.querySelector('#fromDate');
  expect(fromDateElement).toBeInTheDocument();
});

test('renders Search to date input', () => {
  render(<SearchBar />);
  const toDateElement = document.querySelector('#toDate');
  expect(toDateElement).toBeInTheDocument();
});

test('renders Search button', () => {
  render(<SearchBar />);
  const searchButtonElement = document.querySelector('#searchButton');
  expect(searchButtonElement).toBeInTheDocument();
});
