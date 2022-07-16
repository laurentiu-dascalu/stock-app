import React, { useContext, useState } from 'react';
import { StockContext } from '../store/stock-contex';
import { Card } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import classes from "./SearchGraph.module.css";

const StockGraph: React.FC = (props) => {
  const stockCtx = useContext(StockContext);
  const [calcAverage, setCalcAverage] = useState<string>('0');

  var dataStock: { x: Date; y: number[]; }[] = [];
  stockCtx.items.t.forEach((element, index) => {
    var newStock = {
      x: new Date(element*1000),
      y: [
        stockCtx.items.o[index],
        stockCtx.items.h[index],
        stockCtx.items.l[index],
        stockCtx.items.c[index]
      ]
    };

    dataStock.push(newStock);
  });

  React.useEffect(() => { 
    let c:string = '0';
    if(stockCtx.isAverage){
      c = Number(stockCtx.items.c.reduce((a, b) => a + b, 0) / stockCtx.items.c.length).toFixed(2);
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
