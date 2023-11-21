import { Box, Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { set } from 'lodash';

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

    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {

    },
    bankDetails: {
        marginTop: '20px',
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
    },
    search: {
        border: '1px solid rgb(8, 155, 171)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '18px'
    },
}));

const PurchaseRequisition = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState(getTime())
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function getTime() {
        let time = new Date().toLocaleTimeString('en-US', { hour12: true });
        return time;
    }

    setInterval(() => {
        setTime(getTime())
    }, 1000);

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
                        <h1>Purchase Requisition</h1>
                        <form className={classes.form}>
                            <TextField margin='normal' className={classes.input} id="party-name" label="Location/ Store" variant="outlined" />
                            <TextField margin='normal' className={classes.input} id="address" label="Product Name" variant="outlined" />
                            <TextField
                                margin='normal'
                                className={classes.input}
                                id="date"
                                label="Date"
                                variant="outlined"
                                value={selectedDate.toLocaleDateString()} 
                                onChange={handleDateChange}
                            />
                            <TextField
                                margin='normal'
                                className={classes.input}
                                id="contact"
                                label="Time"
                                value={time}
                                variant="outlined"
                            />
                            <TextField margin='normal' className={classes.input} id="gst" label="Qty" variant="outlined" />
                            <TextField margin='normal' className={classes.input} id="pan" label="Purpose" variant="outlined" />
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', }}>Save</Button>
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
                                <TableCell>Req Qty</TableCell>
                                <TableCell>Available Qty</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Vendor Name</TableCell>
                                <TableCell>Purpose</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Paper Rim</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>2023-09-20</TableCell>
                                <TableCell>ABC Medical</TableCell>
                                <TableCell>To take printout for Addmission Form</TableCell>
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

export default PurchaseRequisition
