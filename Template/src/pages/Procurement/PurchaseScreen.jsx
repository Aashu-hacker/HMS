import Page from '@layout/Page'
import { Button, FormControl, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    btn: {
        marginTop: '12px',
    },
    form: {
        width: '100%',
        padding: theme.spacing(2),
    },
    input: {
        marginBottom: '10px',
    },
    bankDetails: {
        marginTop: '20px',
    },
}));

const PurchaseScreen = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField margin='normal' id="party-name" label="Party Name" variant="standard" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                margin='normal'
                                id="date"
                                label="Date"
                                inputFormat="DD-MM-YYYY"
                                renderInput={(props) => <TextField {...props} margin="normal" variant="standard" label="Date" />}
                                fullWidth
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField margin='normal' id="party-name" label="Invoice No." variant="standard" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                margin='normal'
                                id="date"
                                label="Date"
                                inputFormat="DD-MM-YYYY"
                                renderInput={(props) => <TextField {...props} margin="normal" variant="standard" label="Invoice Date" />}
                                fullWidth
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={8}>
                        <h2>Purchase Against</h2>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="po" control={<Radio />} label="Purchase Order" />
                                <FormControlLabel value="dp" control={<Radio />} label="Direct Purchase" />
                                <FormControlLabel value="dm" control={<Radio />} label="DM Purchase" />
                                <FormControlLabel value="cp" control={<Radio />} label="Cash Purchase" />
                                <FormControlLabel value="crp" control={<Radio />} label="Credit Purchase" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* <Paper>
                        <TableContainer style={{ marginTop: "20px" }}>
                            <Table className={classes.table} aria-label="Department Table">
                                <TableHead style={{ backgroundColor: "rgb(8,155,171)" }}>
                                    <TableRow>
                                        <TableCell>Sr. No.</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Purchase Rate</TableCell>
                                        <TableCell>GST %</TableCell>
                                        <TableCell>GST Amount</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                        <TableCell>Discount %</TableCell>
                                        <TableCell>Discount</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>Paper Rim</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>1200</TableCell>
                                        <TableCell>12</TableCell>
                                        <TableCell>144</TableCell>
                                        <TableCell>1344</TableCell>
                                        <TableCell>10%</TableCell>
                                        <TableCell>134.4</TableCell>
                                        <TableCell>1209.6</TableCell>
                                        <TableCell>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper> */}
                {/* <div>
                        <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', }}>Create DM</Button>
                        <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Cancel</Button>
                        <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Approval</Button>
                        <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Valid</Button>
                    </div> */}
            </form>
        </>
    )
}

export default PurchaseScreen
