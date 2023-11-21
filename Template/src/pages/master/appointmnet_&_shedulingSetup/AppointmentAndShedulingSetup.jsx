import React, { useState } from 'react';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Page from '@layout/Page';
import Add from './add_edit/Add';
import Edit from './add_edit/Edit';
import AddIcon from '@mui/icons-material/Add';
import REACT_APP_BASE_URL from 'API/api';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const AppointmentAndShedulingSetup = () => {
    const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('')
    const [showData, setShowData] = useState([])
    const [editData, setEditData] = useState({})
    const toast = useToast()

    const openRegistration = () => {
        setOpenRegistrationModal(true);
    };

    const closeRegistration = () => {
        setOpenRegistrationModal(false);
        setOpenDeleteModal(false)
    };

    const openEdit = (item) => {
        setOpenEditModal(true);
        setEditData(item)
    };

    const closeEdit = () => {
        setOpenEditModal(false);
    };

    const closeDelete = () => {
        setOpenDeleteModal(false);
    };

    const getAppointmentSchedulling = async () => {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}appointmentSchedule-master`);
            if (response.ok) {
                const data = await response.json();
                setShowData(data.data);
                console.log("data", data.data);
            } else {
                console.error('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    const openDeleteModalFun = (id) => {
        setDeleteId(id)
        setOpenDeleteModal(true);
    };

    const deleteAppointment = async(id) => {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}appointmentSchedule-master/delete/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                getAppointmentSchedulling()
                toast({
                    title: 'Appointment deleted!!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                setOpenDeleteModal(false)
            } else {
                toast({
                    title: 'Failed to delete department!!',
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
    }

    useEffect(() => {
        getAppointmentSchedulling()
    }, [])

    return (
        <Page title='Appointment & Scheduling' >
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Button variant="contained" onClick={openRegistration} style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}><AddIcon />Add</Button>
                    <Add open={openRegistrationModal} onClose={closeRegistration} getAppointmentSchedulling={getAppointmentSchedulling} />
                    <Edit open={openEditModal} onClose={closeEdit} item={editData} getAppointmentSchedulling={getAppointmentSchedulling} />
                </div>
                <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Department Table">
                            <TableHead >
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell>Doctor Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>End Time</TableCell>
                                    <TableCell>Time Interval</TableCell>
                                    <TableCell>Sheduling Repeat</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    showData && showData?.map((item, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{item.doctorName}</TableCell>
                                                <TableCell>{item.departmentName}</TableCell>
                                                <TableCell>{item.startTime}</TableCell>
                                                <TableCell>{item.endTime}</TableCell>
                                                <TableCell>{item.timeInterval}</TableCell>
                                                <TableCell>{item.scheduling}</TableCell>
                                                <TableCell>
                                                    <IconButton color="primary" onClick={() => openEdit(item)} >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary" onClick={() => openDeleteModalFun(item._id)}>
                                                        <DeleteIcon  />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Modal
                    open={openDeleteModal}
                    onClose={closeDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ borderRadius: "10px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
                        <h2>Delete Appointment?</h2>
                        <div style={{ marginTop: "30px" }}>
                            <Button type="submit" variant="contained" style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }} onClick={() => deleteAppointment(deleteId)} >Yes</Button>
                            <Button variant="contained" style={{ backgroundColor: "white", color: 'gray' }} onClick={() => closeRegistration()}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </Page>
    );
};

export default AppointmentAndShedulingSetup;

