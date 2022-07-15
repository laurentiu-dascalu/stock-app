import './App.css';
import Layout from './components/layout/Layout';
import StockGraph from './components/stock/StockGraph';
import React from 'react';

function App() {
  return (
    <Layout>
      <StockGraph/>
    </Layout>
    
  );
}

export default App;
