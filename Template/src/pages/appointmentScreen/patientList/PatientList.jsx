import React, { useState } from 'react';
import { Button, Modal, InputLabel, Radio, RadioGroup, FormControl, FormControlLabel, TextField, Typography, Select, MenuItem } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Page from '@layout/Page';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../../../components/Global.module.css';

const DepartmentSetup = () => {
    const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
    const [departmentType, setDepartmentType] = useState('');
    const [step, setStep] = useState(0);

    const openRegistration = () => {
        setOpenRegistrationModal(true);
        setStep(0);
    };

    const closeRegistration = () => {
        setOpenRegistrationModal(false);
    };

    const handleDepartmentTypeChange = (event) => {
        setDepartmentType(event.target.value);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <form>
                        <TextField fullWidth label="Patient Name" variant="outlined" margin="normal" />
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <TextField fullWidth label="Age" variant="outlined" margin="normal" />
                            <FormControl margin="normal" fullWidth variant="outlined" >
                                <InputLabel margin="normal" variant="outlined">Sex</InputLabel>
                                <Select
                                    label="Department Function"
                                    value={departmentType}
                                    onChange={handleDepartmentTypeChange}>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField fullWidth label="Mobile No." variant="outlined" margin="normal" />
                        <TextField fullWidth label="Adress" variant="outlined" margin="normal" />
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <TextField fullWidth label="Country" variant="outlined" margin="normal" />
                            <TextField fullWidth label="State" variant="outlined" margin="normal" />
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <TextField fullWidth label="City" variant="outlined" margin="normal" />
                            <TextField fullWidth label="Pincode" variant="outlined" margin="normal" />
                        </div>
                        <div >
                            <button className={styles.global_btn} onClick={handleNext}>Next</button>
                        </div>
                    </form>
                );
            case 1:
                return (
                    <form>
                        <TextField fullWidth label="Department Name" variant="outlined" margin="normal" />
                        <TextField fullWidth label="Consultant Name" variant="outlined" margin="normal" />
                        <TextField fullWidth label="Time Slot" variant="outlined" margin="normal" />
                        <TextField fullWidth label="Consultantion Type" variant="outlined" margin="normal" />
                        <button className={styles.global_btn} onClick={handlePrevious}>Previous</button>
                        <button className={styles.global_btn} onClick={closeRegistration}>Book Appointment</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <Page title='Patient List'>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button className={styles.global_btn} onClick={openRegistration} >Provisional registration</button>
                    <input
                        className={styles.search_input}
                        type="search"
                        placeholder="Search Patient UHID/Mobile No./Name"
                    />
                </div>
                <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                            <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>UHID/ MRN</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Sex</TableCell>
                                    <TableCell>Adress</TableCell>
                                    <TableCell>Pin Code</TableCell>
                                    <TableCell>Mobile No.</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Replace the following rows with your data */}
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Rajeev Mishra</TableCell>
                                    <TableCell>ABC/123456789</TableCell>
                                    <TableCell>34</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>Shankar Sqaure, Nagpur</TableCell>
                                    <TableCell>440033</TableCell>
                                    <TableCell>9885948589</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CheckIcon />}
                                            style={{ margin: "5px" }}>
                                            Book Appointment
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>Selmon Bhoi</TableCell>
                                    <TableCell>ABC/34543334</TableCell>
                                    <TableCell>58</TableCell>
                                    <TableCell>Male</TableCell>
                                    <TableCell>Galaxy Apartment, Mumbai</TableCell>
                                    <TableCell>440033</TableCell>
                                    <TableCell>8574594858</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CheckIcon />}
                                            style={{ margin: "5px" }}>
                                            Book Appointment
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Modal
                    open={openRegistrationModal}
                    onClose={closeRegistration}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
                        <h1>Provisional Registration</h1>
                        {renderStepContent()}
                    </div>
                </Modal>
            </div>
        </Page>
    );
};

export default DepartmentSetup;