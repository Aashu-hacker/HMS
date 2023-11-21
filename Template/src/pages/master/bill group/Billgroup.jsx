import React, { useState, useEffect } from 'react';
import { Button, Modal, Radio, RadioGroup, FormControl, FormControlLabel, TextField} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Page from '@layout/Page';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import REACT_APP_BASE_URL from "../../../API/api";

const Billgroup = () => {
    const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showData, setShowData] = useState([])
    const [deleteId, setDeleteId] = useState('')
    const [selectedBillgroup, setSelectedBillgroup] = useState(null);
    const toast = useToast()

    const [billgroupData, setBillgroupData] = useState({
        billGroupName: '',
        billGroupCode: '',
        accountLedger: '',
        description: '',
        status: '',
    });

    const fetchBillgroup = async () => {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}billgroup-master`);
            if (response.ok) {
                const data = await response.json();
                setShowData(data.data);
            } else {
                console.error('Failed to fetch bill group');
            }
        } catch (error) {
            console.error('Error fetching bill groups:', error);
        }
    };

    const deleteBillgroup = async (id) => {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}billgroup-master/delete/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchBillgroup()
                toast({
                    title: 'Bill Group deleted!!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                setOpenDeleteModal(false)
            } else {
                toast({
                    title: 'Failed to delete Bill Group!!',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        } catch (error) {
            toast({
                title: 'Server error!!',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    const openRegistration = () => {
        setOpenRegistrationModal(true);
    };

    const openEditModalFun = (bill) => {
        setSelectedBillgroup(bill);
        setBillgroupData({
            billGroupName: bill.billGroupName,
            billGroupCode: bill.billGroupCode,
            accountLedger: bill.accountLedger,
            description: bill.description,
            status: bill.status,
        });
        setOpenEditModal(true);
    };

    const openDeleteModalFun = (id) => {
        setDeleteId(id)
        setOpenDeleteModal(true);
    };

    const closeRegistration = () => {
        setOpenRegistrationModal(false);
        setOpenEditModal(false)
        setOpenDeleteModal(false)
        setBillgroupData({
            billGroupName: '',
            billGroupCode: '',
            accountLedger: '',
            description: '',
            status: '',
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${REACT_APP_BASE_URL}billgroup-master`, billgroupData);
            setOpenRegistrationModal(false);
            fetchBillgroup();
            setBillgroupData({
                billGroupName: '',
                billGroupCode: '',
                accountLedger: '',
                description: '',
                status: '',
            });
            toast({
                title: 'Bill Group Added!!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
        } catch (error) {
            toast({
                title: 'Server error!!',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const billgroupDataToSend = {
            ...selectedBillgroup,
            ...billgroupData,
        };

        try {
            await axios.put(`${REACT_APP_BASE_URL}billgroup-master/${selectedBillgroup._id}`, billgroupDataToSend);
            setOpenEditModal(false);
            fetchBillgroup();
            toast({
                title: 'Bill Group Updated!!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
            setBillgroupData({
                billGroupName: '',
                billGroupCode: '',
                accountLedger: '',
                description: '',
                status: '',
            })
        } catch (error) {
            toast({
                title: 'Server error!!',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    useEffect(() => {
        fetchBillgroup();
    }, [])

    return (
        <Page title='Bill Group' >
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Button variant="contained" onClick={openRegistration} style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>+ Add</Button>
                    <Modal
                        open={openRegistrationModal}
                        onClose={closeRegistration}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ borderRadius: "8px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
                            <h1>Add Bill Group</h1>
                            <form onSubmit={handleSubmit}>
                                <TextField fullWidth
                                    label="Bill Group Name"
                                    variant="outlined"
                                    margin="normal"
                                    name="billGroupName"
                                    value={billgroupData.billGroupName}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, billGroupName: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Department Code"
                                    variant="outlined"
                                    margin="normal"
                                    name="billGroupCode"
                                    value={billgroupData.billGroupCode}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, billGroupCode: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Account Ledger"
                                    variant="outlined"
                                    margin="normal"
                                    name="accountLedger"
                                    value={billgroupData.accountLedger}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, accountLedger: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Description"
                                    variant="outlined"
                                    margin="normal"
                                    name="description"
                                    value={billgroupData.description}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, description: e.target.value })
                                    }
                                />
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="status"
                                        value={billgroupData.status}
                                        onChange={(e) =>
                                            setBillgroupData({ ...billgroupData, status: e.target.value })
                                        }
                                    >
                                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                    </RadioGroup>
                                </FormControl>
                                <div>
                                    <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }} >Save</Button>
                                    <Button variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }} onClick={() => closeRegistration()}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
                <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                            <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                                <TableRow>
                                    <TableCell>Sr. No.</TableCell>
                                    <TableCell>Bill Group Name</TableCell>
                                    <TableCell>Bill Group Code</TableCell>
                                    <TableCell>Account Ledger</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showData.length <= 0 && (
                                    <TableRow>
                                        <TableCell colSpan="5">No Data Found</TableCell>
                                    </TableRow>
                                )}
                                {showData.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.billGroupName}</TableCell>
                                            <TableCell>{item.billGroupCode}</TableCell>
                                            <TableCell>{item.accountLedger}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => openEditModalFun(item)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => openDeleteModalFun(item._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal
                        open={openEditModal}
                        onClose={closeRegistration}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ borderRadius: "8px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
                            <h1>Edit Bill Group</h1>
                            <form onSubmit={handleEditSubmit}>
                                <TextField fullWidth
                                    label="Bill Group Name"
                                    variant="outlined"
                                    margin="normal"
                                    name="billGroupName"
                                    value={billgroupData.billGroupName}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, billGroupName: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Bill Group Code"
                                    variant="outlined"
                                    margin="normal"
                                    name="billGroupCode"
                                    value={billgroupData.billGroupCode}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, billGroupCode: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Account Ledger"
                                    variant="outlined"
                                    margin="normal"
                                    name="accountLedger"
                                    value={billgroupData.accountLedger}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, accountLedger: e.target.value })
                                    }
                                />
                                <TextField fullWidth
                                    label="Description"
                                    variant="outlined"
                                    margin="normal"
                                    name="description"
                                    value={billgroupData.description}
                                    onChange={(e) =>
                                        setBillgroupData({ ...billgroupData, description: e.target.value })
                                    }
                                />

                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="status"
                                        value={billgroupData.status}
                                        onChange={(e) => setBillgroupData({ ...billgroupData, status: e.target.value })}
                                    >
                                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                    </RadioGroup>
                                </FormControl>
                                <div>
                                    <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }} >Save</Button>
                                    <Button variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }} onClick={() => closeRegistration()}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal
                        open={openDeleteModal}
                        onClose={closeRegistration}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div style={{ borderRadius: "10px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
                            <h2>Delete Bill Group?</h2>
                            <div style={{ marginTop: "30px" }}>
                                <Button type="submit" variant="contained" style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }} onClick={() => deleteBillgroup(deleteId)} >Yes</Button>
                                <Button variant="contained" style={{ backgroundColor: "white", color: 'gray' }} onClick={() => closeRegistration()}>Cancel</Button>
                            </div>
                        </div>
                    </Modal>
                </Paper>
            </div>
        </Page>
    );
};

export default Billgroup;
