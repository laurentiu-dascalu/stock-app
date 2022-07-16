import React, { useState } from "react";
import Stock from "../models/stock";

type StockContextObj = {
  items: Stock;
  isAverage: boolean;
  stockName: string;
  setItems: (items: Stock) => void;
  delItems: () => void;
  setIsAverage: (isAverage: boolean) => void;
  setStockName: (name: string) => void;
};

export const StockContext = React.createContext<StockContextObj>({
  items: new Stock,
  isAverage: false,
  stockName: '',
  setItems: (Stock) => {},
  delItems: () => {},
  setIsAverage: (isAverage: boolean) => {},
  setStockName: (name: string) => {}
});

const StockContextProvider: React.FC<{ children: React.ReactNode; }> = (props) => {
  const [stocks, setItems] = useState<Stock>(new Stock);
  const [average, setIsAverage] = useState<boolean>(false);
  const [name, setStockName] = useState<string>('');

  const setItemsHandler = (itemsP: Stock) => {
    setItems(itemsP);
  };
  const delItemsHandler = () => {
    var items = new Stock;
    setItems(items);
  };
  const setIsAverageHandler = (averageP: boolean) => {
    setIsAverage(averageP);
  };
  const setStockNameHandler = (nameP: string) => {
    setStockName(nameP);
  };

  const contextValue: StockContextObj = {
    items: stocks,
    isAverage: average,
    stockName: name,
    setItems: setItemsHandler,
    delItems: delItemsHandler,
    setIsAverage: setIsAverageHandler,
    setStockName: setStockNameHandler,
  };

  return (
    <StockContext.Provider value={contextValue}>
      {props.children}
    </StockContext.Provider>
  );
};

export default StockContextProvider;
