import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const Provisional = () => {
    const navigate = useNavigate("")
    return (
        <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                    <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                        <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Appointment Date</TableCell>
                            <TableCell>Appointment Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Ankush Rai</TableCell>
                            <TableCell>Cardiology</TableCell>
                            <TableCell>Dr. Chadda</TableCell>
                            <TableCell>16/01/2023</TableCell>
                            <TableCell>12:10 PM</TableCell>
                            <TableCell>Provisonal</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => navigate('/patient_registration_form2')}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CheckIcon />}
                                    style={{ margin: "5px" }}>
                                    Confirm
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CancelIcon />}>
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Pushkraj</TableCell>
                            <TableCell>Cardiology</TableCell>
                            <TableCell>Dr. Nene</TableCell>
                            <TableCell>16/01/2023</TableCell>
                            <TableCell>12:10 PM</TableCell>
                            <TableCell>Provisonal</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => navigate('/patient_registration_form2')}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CheckIcon />}
                                    style={{ margin: "5px" }}>
                                    Confirm
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CancelIcon />}>
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Provisional;
