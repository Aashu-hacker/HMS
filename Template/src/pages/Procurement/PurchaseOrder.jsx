import { Autocomplete, Box, Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
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
        border: '1px solid rgb(8, 144, 171)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '18px'
    },
}));

const PurchaseOrder = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [orderAgainstValue, setOrderAgainstValue] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const orderAgainst = [
        { label: 'Purchase Requisition' },
        { label: 'Direct Order' }
    ]

    return (
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: "12px 0" }}>
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
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={orderAgainst}
                                value={orderAgainstValue} 
                                onChange={(event, newValue) => {
                                    setOrderAgainstValue(newValue);
                                }}
                                renderInput={(params) => <TextField margin='normal' {...params} label="Order Against" variant='outlined' />}
                            />
                            <TextField
                                margin='normal'
                                id="address"
                                label="Requisition Order List"
                                variant="outlined"
                                disabled={orderAgainstValue && orderAgainstValue.label === 'Direct Order'} // Disable when "Direct Order" is selected
                            />                            <TextField margin='normal' id="mail" label="Party Name" variant="outlined" />
                            <TextField margin='normal' id="contact" label="Product Name" variant="outlined" />
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginTop: '12px', }}>Create Order</Button>
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
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Purchase Rate</TableCell>
                                <TableCell>GST %</TableCell>
                                <TableCell>GST Amount</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Dis %</TableCell>
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
                                <TableCell>12%</TableCell>
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


export default PurchaseOrder
