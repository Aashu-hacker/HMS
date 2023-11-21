import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
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
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginBottom: '10px',
    },
    bankDetails: {
        marginTop: '20px',
    },
    search: {
        border: '1px solid rgb(8, 144, 171)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '18px'
    },
    popUp: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '8px',
        padding: '30px'
    }
}));

const DmPurchase = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 0' }}>
                    <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: "rgb(8,155,171)", color: "white", }}>Add</Button>
                    <input type='text' className={classes.search} placeHolder='Search Product' />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={classes.popUp}>
                        <form className={classes.form}>
                            <TextField margin='normal' id="party-name" label="Party Name" variant="outlined" />
                            <TextField margin='normal' id="contact" label="Product Name" variant="outlined" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    margin='normal'
                                    id="date"
                                    label="Date"
                                    inputFormat="DD-MM-YYYY"
                                    renderInput={(props) => <TextField {...props} margin="normal" variant="outlined" label="Date" />}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', }}>Create DM</Button>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Cancel</Button>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Approval</Button>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', marginLeft: '12px' }}>Valid</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
            <Paper>
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
            </Paper>
        </>
    )
}

export default DmPurchase
