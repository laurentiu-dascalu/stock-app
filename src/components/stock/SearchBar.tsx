import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import classes from "./SearchBar.module.css";
import moment from 'moment';
import { StockContext } from '../store/stock-contex';

const SearchBar: React.FC = (props) => {

    //FinHub API declarations
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    //api_key.apiKey = "sandbox_cb8pjnaad3i0v9a1tc4g";
    api_key.apiKey = "cb8pjnaad3i0v9a1tc40";
    const finnhubClient = new finnhub.DefaultApi();

    const enteredInput = useRef<HTMLInputElement>(null);
    const enteredStartDate = useRef<HTMLInputElement>(null);
    const enteredEndDate = useRef<HTMLInputElement>(null);
    const enteredIsAverage = useRef<HTMLInputElement>(null);

    const [anchorElStart, setAnchorElStart] = useState<HTMLInputElement | null>();
    React.useEffect(() => { 
        setTimeout(() => setAnchorElStart(enteredStartDate.current), 1) 
    },  [enteredStartDate])

    const [anchorElEnd, setAnchorElEnd] = useState<HTMLInputElement | null>();
    React.useEffect(() => { 
        setTimeout(() => setAnchorElEnd(enteredEndDate.current), 1) 
    },  [enteredEndDate])

    //Default Dates
    const endDateConst = new Date();
    const startDateConst = new Date().setMonth(endDateConst.getMonth() - 1);
    const [endDate, setEndDate] = useState<Date | null>(endDateConst);
    const [startDate, setStartDate] = useState<Date | number | null>(startDateConst);

    const stockCtx = useContext(StockContext);

    const submitHandler = (event: React.FormEvent) =>{
        event.preventDefault();
        
        const enteredText = enteredInput.current!.value;
        if(enteredText=== undefined || enteredText.trim().length === 0){
            stockCtx.delItems();
            return;
        }
        
        var enteredStartDateText = enteredStartDate.current!.value;
        if(enteredStartDateText=== undefined || enteredStartDateText.trim().length === 0){
            enteredStartDateText = moment(startDateConst).format('DD/MM/YYYY');
        }
        const startDateISO = moment(enteredStartDateText, 'DD/MM/YYYY').unix();
        
        var enteredEndDateText = enteredEndDate.current!.value;
        if(enteredEndDateText=== undefined || enteredEndDateText.trim().length === 0){
            enteredEndDateText = moment(endDateConst).format('DD/MM/YYYY');
        }
        const endDateISO = moment(enteredEndDateText, 'DD/MM/YYYY').unix();

        var enteredIsAverageVal = enteredIsAverage.current!.checked;
        console.log(enteredIsAverageVal);
        stockCtx.setIsAverage(enteredIsAverageVal);

        finnhubClient.symbolSearch(enteredText, (error: any, data: any, response: any) => {
            if(data.count == 0){
                stockCtx.delItems();
                return;
            }
            var goodStock = data.result.find(function (element: any) {
                return element.type == 'Common Stock';
            });

            if(goodStock == undefined){  
                stockCtx.delItems();
                return;
            }
            var symbol = goodStock.symbol;
            stockCtx.setStockName(goodStock.description+' - '+symbol);

            finnhubClient.stockCandles(symbol, "D", startDateISO, endDateISO, (error: any, data: any, response: any) => {
                if(data === null || data === undefined || data.s!= 'ok'){ 
                    stockCtx.delItems();
                    return;
                }
                stockCtx.setItems(data);
            });
        });

    };

    return (
    <form onSubmit={submitHandler} className={classes.form}>
    <Grid container spacing={2} className={classes.searchBar}>
        <Grid item xs={12} md={10} lg={4} order={{xs:1, md:1, lg:1}}>
            <FormControl fullWidth>
                <TextField
                label="Stock name or code"
                id="outlined-start-adornment"
                className={classes.searchInput}
                inputRef={enteredInput}
                InputProps={{
                    startAdornment: <SearchIcon/>,
                }}
                />
            </FormControl>
        </Grid>
        <Grid className={classes.wrapCenter} item xs={6} md={2} lg={1} order={{xs:4, md:2, lg:4 }}>
            <FormControlLabel control={<Switch inputRef={enteredIsAverage} />} label="Average" />
        </Grid>
        <Grid item xs={6} md={5} lg={3} order={{xs:2, md:3, lg:2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
                <DatePicker
                    label="From date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => 
                        <TextField 
                        {...params} 
                        className={classes.searchInput} 
                        inputRef={enteredStartDate} 
                        />
                    } 
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    PopperProps={{
                        anchorEl: anchorElStart
                    }}
                    value={startDate}        
                />
            </FormControl>
            </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md={5} lg={3} order={{xs:3, md:4, lg:3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
                <DatePicker
                    label="To date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => 
                        <TextField 
                        {...params} 
                        className={classes.searchInput} 
                        inputRef={enteredEndDate} 
                        />
                    } 
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    PopperProps={{
                        anchorEl: anchorElEnd
                    }}
                    value={endDate}        
                />
            </FormControl>
            </LocalizationProvider>
        </Grid>
        <Grid className={classes.wrapCenter} item xs={6} md={2} lg={1} order={{xs:5, md:5, lg:5 }}>
            <Button type="submit" variant="contained">Search</Button>
        </Grid>
    </Grid>
    </form>
    );
}

export default SearchBar;