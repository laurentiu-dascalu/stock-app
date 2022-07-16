import './App.css';
import Layout from './components/layout/Layout';
import StockGraph from './components/stock/StockGraph';
import React, { useContext } from 'react';
import { Alert } from '@mui/material';
import { StockContext } from './components/store/stock-contex';

function App() {
  const stockCtx = useContext(StockContext);

  var isOk = false;
  if(stockCtx.items.s=='ok'){
    isOk = true;
  }

  return (
    <Layout>
      {!isOk && <Alert severity="error">No stock data.</Alert>}
      {isOk && <StockGraph/>}
    </Layout>
    
  );
}

export default App;
