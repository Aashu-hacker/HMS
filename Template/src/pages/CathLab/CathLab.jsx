import Page from '@layout/Page'
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
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

const CathLab = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <Page title='CathLab Store'>
                <div>
                    <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginBottom: '12px', }}>Cathlab</Button>
                    <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginBottom: '12px', marginLeft: '12px' }}>CSSD</Button>
                </div>
                <Paper>
                    <TableContainer>
                        <Table className={classes.table} aria-label="Cath Lab Store">
                            <TableHead style={{ backgroundColor: "rgb(8,155,171)" }}>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Lot No.</TableCell>
                                    <TableCell>Batch No.</TableCell>
                                    <TableCell>Expiry Date</TableCell>
                                    <TableCell>Available</TableCell>
                                    <TableCell>Serial No.</TableCell>
                                    <TableCell>Activity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Stent</TableCell>
                                    <TableCell>ABCDEFG</TableCell>
                                    <TableCell>A-BCDEFG</TableCell>
                                    <TableCell>July-13</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Bca144</TableCell>
                                    <TableCell>
                                        <FormControl>
                                            <RadioGroup row aria-label="product-type" name="row-radio-buttons-group">
                                                <FormControlLabel value="singleUse" control={<Radio />} label="Single Use" />
                                                <FormControlLabel value="resuse" control={<Radio />} label="Reuse" />
                                            </RadioGroup>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Page>
        </>
    )
}

export default CathLab
