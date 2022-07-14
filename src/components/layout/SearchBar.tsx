import { FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import classes from "./SearchBar.module.css";

function SearchBar(){
    return (
        <Grid container spacing={2} className={classes.searchBar}>
        <Grid item xs={12} md={10} lg={4} order={{xs:1, md:1, lg:1}}>
            <FormControl fullWidth>
                <TextField
                label="Stock name or code"
                id="outlined-start-adornment"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: <SearchIcon/>,
                }}
                />
            </FormControl>
        </Grid>
        <Grid className={classes.wrapCenter} item xs={6} md={2} lg={1} order={{xs:4, md:2, lg:4 }}>
            <FormControlLabel control={<Switch />} label="Average" />
        </Grid>
        <Grid item xs={6} md={5} lg={3} order={{xs:2, md:3, lg:2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
                <DatePicker
                    label="From date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} className={classes.searchInput} />} 
                    onChange={function (): void {
                        console.log('test');
                    } } 
                    value={undefined}        
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
                    renderInput={(params) => <TextField {...params} className={classes.searchInput} />} 
                    onChange={function (): void {
                        console.log('test');
                    } } 
                    value={undefined}        
                />
            </FormControl>
            </LocalizationProvider>
        </Grid>
        <Grid className={classes.wrapCenter} item xs={6} md={2} lg={1} order={{xs:5, md:5, lg:5 }}>
            <Button variant="contained">Search</Button>
        </Grid>
    </Grid>
    );
}

export default SearchBar;