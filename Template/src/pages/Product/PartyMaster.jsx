import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import AddParty from './Modals/AddParty';
import DeleteParty from './Modals/DeleteParty';
import REACT_APP_BASE_URL from 'API/api';
import EditParty from './Modals/EditParty';

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
    search: {
        border: '1px solid rgb(8, 155, 171)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '18px'
    },
}));

function PartyMaster() {
    const classes = useStyles();
    const toast = useToast()
    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [partyData, setPartyData] = React.useState([]);
    const [editPartyData, setEditPartyData] = React.useState(null);
    const [deletedParty, setDeletedParty] = React.useState(null);
    const [searchInput, setSearchInput] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteOpen = (deleteParty) => {
        setDeletedParty(deleteParty)
        setDeleteOpen(true)
    };

    const handleDeleteClose = () => {
        setDeletedParty(null)
        setDeleteOpen(false)
    };

    const handleEditOpen = (partyData) => {
        setEditPartyData(partyData)
        setEditOpen(true)
    };

    const handleEditClose = () => {
        setEditPartyData(null)
        setEditOpen(false)
    };

    const getAllParty = async () => {
        try {
            const { data } = await axios.get(`${REACT_APP_BASE_URL}party-master`)
            if (data && data.allParty) {
                setPartyData(data.allParty)
            }
        } catch (error) {
            console.log("Error in fetching data ", error);
        }
    }

    const deleteParty = async (deletedParty) => {
        try {
            const { data } = await axios.put(`${REACT_APP_BASE_URL}party-master/delete/${deletedParty._id}`);
            if (data) {
                toast({
                    title: 'Deleted Party',
                    description: data.msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                getAllParty();
                handleDeleteClose();

            }
        } catch (error) {
            console.log(error);
        }
    }

    const editParty = async (editedPartyData) => {
        try {
            const { data } = await axios.put(`${REACT_APP_BASE_URL}party-master/${editedPartyData._id}`, editedPartyData);
            if (data) {
                toast({
                    title: 'Party Edited',
                    description: data.msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                getAllParty();
                handleEditClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredPartyData = partyData.filter((party) =>
        party.partyName.toLowerCase().includes(searchInput.toLowerCase())
    );

    React.useEffect(() => {
        getAllParty();
    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 0' }}>
                <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: "rgb(8,155,171)", color: "white", }}>Add</Button>
                <input type='text' className={classes.search} placeHolder='Search Party'  value={searchInput} onChange={handleSearchChange} />
                <AddParty open={open} onClose={handleClose} getAllParty={getAllParty} />
                <EditParty open={editOpen} onClose={handleEditClose} onEdit={editParty} editPartyData={editPartyData} />
                <DeleteParty open={deleteOpen} onClose={handleDeleteClose} onDelete={deleteParty} deletedParty={deletedParty} />
            </div>
            <Paper>
                <TableContainer style={{ marginTop: "20px" }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell>Party Name</TableCell>
                                <TableCell>Pan No.</TableCell>
                                <TableCell>Contact No.</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>GST No.</TableCell>
                                <TableCell>Bank Name</TableCell>
                                <TableCell>Account Number</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPartyData.map((party, index) => {
                                return (
                                    <TableRow key={party._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{party.partyName}</TableCell>
                                        <TableCell>{party.pan}</TableCell>
                                        <TableCell>{party.contact}</TableCell>
                                        <TableCell>{party.address}</TableCell>
                                        <TableCell>{party.gst}</TableCell>
                                        <TableCell>{party.bankName}</TableCell>
                                        <TableCell>{party.bankAccountNo}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary">
                                                <EditIcon onClick={() => handleEditOpen(party)} />
                                            </IconButton>
                                            <IconButton color="secondary">
                                                <DeleteIcon onClick={() => handleDeleteOpen(party)} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default PartyMaster;
