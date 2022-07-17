import React, { useContext, useState } from 'react';
import { StockContext } from '../store/stock-contex';
import { Card } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import classes from "./StockGraph.module.css";
import Stock from '../models/stock';

const StockGraph: React.FC<{testData?: Stock }> = (props) => {
  const stockCtx = useContext(StockContext);
  const [calcAverage, setCalcAverage] = useState<string>('0');

  var dataStock: { x: Date; y: number[]; }[] = [];
  
  var itemsStockData =  stockCtx.items;
  if(props.testData !== undefined){
    itemsStockData =  props.testData;
  }

  itemsStockData.t.forEach((element, index) => {
    var newStock = {
      x: new Date(element*1000),
      y: [
        itemsStockData.o[index],
        itemsStockData.h[index],
        itemsStockData.l[index],
        itemsStockData.c[index]
      ]
    };

    dataStock.push(newStock);
  });

  React.useEffect(() => { 
    let c:string = '0';
    if(stockCtx.isAverage){
      c = Number(itemsStockData.c.reduce((a, b) => a + b, 0) / itemsStockData.c.length).toFixed(2);
    }
    setCalcAverage(c);
  },  [stockCtx])
  
  var cartObj = {
          
    series: [{
      data: dataStock
    }],
    options: {
      chart: {
        height: 350
      },
      title: {
        text: stockCtx.stockName
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },
      xaxis: {
        labels: {
          formatter: function(value: string) {
            return moment(value).format("DD-MM-YYYY");
          }
        }
      },
      annotations: {
        yaxis: [
          {
            y: calcAverage,
            borderColor: '#1976d2',
            label: {
              borderColor: '#1976d2',
              style: {
                color: '#fff',
                background: '#1976d2'
              },
              text: 'Average ' + calcAverage
            }
          }
        ]
      }
    }
  };

  return (
      <Card className={classes.cardStock}>
        <ReactApexChart
              options={cartObj.options}
              series={cartObj.series}
              type="candlestick" 
              height={350}
            />
      </Card>
    
  );
}

export default StockGraph;
