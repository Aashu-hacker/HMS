import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProcurementData = () => {
    return (
        <div>
            <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell>GRN No.</TableCell>
                                <TableCell>PO. No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Party Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>GRN 12</TableCell>
                                <TableCell>PO-1236</TableCell>
                                <TableCell>20-01-2023</TableCell>
                                <TableCell>Parimal Enterprises</TableCell>
                                <TableCell>2500</TableCell>
                                <TableCell>Approved</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ProcurementData;
