import React from 'react';
import { Button, FormControl, Grid, InputLabel, TextField, } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Page from '@layout/Page';
import { MenuItem, Select } from '@mui/material';

function AppointmentBilling() {
    return (
        <Page title='Appointment Billing'>
            <form>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ margin: '10px' }}>Patient Details</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth id="patient" label="Patient Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="patient" label="Patient Type" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="patient" label="UHID No." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="patient" label="Patient Encounter" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel variant="outlined">Type Consultation</InputLabel>
                                <Select
                                    label="Type Consultation"
                                    value="Male">
                                    <MenuItem value="Male">New</MenuItem>
                                    <MenuItem value="Female">Follow Up</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ margin: '10px' }}>Service Details</h2>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                            <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                                <TableRow>
                                    <TableCell>Service Name</TableCell>
                                    <TableCell>Doctor Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Chagres</TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell>Net Ammount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Consulation Chagres</TableCell>
                                    <TableCell>Dr. XYZ</TableCell>
                                    <TableCell>PQR</TableCell>
                                    <TableCell>300</TableCell>
                                    <TableCell>50%</TableCell>
                                    <TableCell>100</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ margin: '10px' }}>Payment Details</h2>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                            <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                                <TableRow>
                                    <TableCell>Gross Amount</TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell>Net Ammount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>300</TableCell>
                                    <TableCell>50%</TableCell>
                                    <TableCell>100</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" style={{ marginRight: '16px', backgroundColor: "rgb(8,155,171)" }}>Cash</Button>
                    <Button variant="contained" style={{ marginRight: '16px', backgroundColor: "rgb(8,155,171)" }}>Online</Button>
                    <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)" }}>Credit</Button>
                </div>
            </form>
        </Page>
    )
}

export default AppointmentBilling
