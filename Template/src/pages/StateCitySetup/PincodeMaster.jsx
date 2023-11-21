import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Page from '@layout/Page';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
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
    form: {
        display: "flex",
        flexDirection: 'column',
    },
    input: {
        width: '500px'
    },
    popupBtn: {
        margin: '12px 0'
    },
    btn: {
        margin: '10px 0'
    },
    dropdown: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

function PincodeMaster() {
    const classes = useStyles();
    const [stateModalOpen, setStateModalOpen] = React.useState(false);
    const [cityModalOpen, setCityModalOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleStateOpen = () => setStateModalOpen(true);
    const handleStateClose = () => setStateModalOpen(false);

    const handleCityOpen = () => setCityModalOpen(true);
    const handleCityClose = () => setCityModalOpen(false);

    const handleChange = (e) => {
        setAge(e.target.value);
    };

    const states = [
        { label: 'Maharashtra' },
        { label: 'Punjab' },
        { label: 'Delhi' },
        { label: 'Gujrat' },
        { label: 'Telangana' },
        { label: "Karnataka" },
        { label: 'Tamil Nadu' },
    ]

    return (
        <>
            <Page title='Pincode Master'>
                <div className={classes.container}>
                    <div className={classes.popupBtn}>
                        <Button
                            variant="contained"
                            onClick={handleStateOpen}
                            style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}
                        >
                            Add
                        </Button>
                        <Modal
                            open={stateModalOpen}
                            onClose={handleStateClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className={classes.popUp}>
                                <h1>Add Pincode</h1>
                                <form className={classes.form}>
                                    <TextField className={classes.input} margin='normal' id="pincode" label="Pincode" variant="outlined" />
                                    <TextField className={classes.input} margin='normal' id="area" label="Area" variant="outlined" />
                                    <TextField className={classes.input} margin='normal' id="city" label="City" variant="outlined" />
                                    <TextField className={classes.input} margin='normal' id="state" label="State" variant="outlined" />
                                    <TextField className={classes.input} margin='normal' id="country" label="Country" variant="outlined" />
                                    <div>
                                        <Button variant="contained" className={classes.btn} style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Save</Button>
                                        <Button variant="contained" className={classes.btn} style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: "12px" }}>Cancel</Button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                        <Button
                            variant="contained"
                            onClick={handleCityOpen}
                            style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginLeft: '10px' }}
                        >
                            Download Sample
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCityOpen}
                            style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginLeft: '10px' }}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCityOpen}
                            style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginLeft: '10px' }}
                        >
                            Attach File
                        </Button>
                    </div>
                    <Paper className={classes.root}>
                        <TableContainer>
                            <Table className={classes.table} aria-label="Department Table">
                                <TableHead style={{ backgroundColor: "rgb(8,155,171)" }}>
                                    <TableRow>
                                        <TableCell>SN</TableCell>
                                        <TableCell>Area</TableCell>
                                        <TableCell>Pincode</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>Country</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>Wadi</TableCell>
                                        <TableCell>440023</TableCell>
                                        <TableCell>Nagpur</TableCell>
                                        <TableCell>Maharashtra</TableCell>
                                        <TableCell>India</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </Page>
        </>
    );
}

export default PincodeMaster


