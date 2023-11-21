import { useToast } from '@chakra-ui/react';
import { Box, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import REACT_APP_BASE_URL from 'API/api';
import React from 'react'

const AddParty = ({ open, onClose, getAllParty }) => {
    const [inputData, setInputData] = React.useState({
        partyName: "",
        address: "",
        email: "",
        contact: "",
        gst: "",
        pan: "",
        bankName: "",
        bankAccountNo: "",
    });
    const toast = useToast()

    const handleInputChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const newPartyRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${REACT_APP_BASE_URL}party-master`, {
                partyName: inputData.partyName,
                address: inputData.address,
                email: inputData.email,
                contact: inputData.contact,
                gst: inputData.gst,
                pan: inputData.pan,
                bankName: inputData.bankName,
                bankAccountNo: inputData.bankAccountNo,
            },
            )
            if (data) {
                toast({
                    title: 'Added New Party',
                    description: data.msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
                setInputData({
                    partyName: "",
                    address: "",
                    email: "",
                    contact: "",
                    gst: "",
                    pan: "",
                    bankName: "",
                    bankAccountNo: "",
                })
                getAllParty()
                onClose()

            } else {
                toast({
                    title: 'Server Error',
                    description: data.msg,
                    status: 'failure',
                    duration: 4000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        } catch (error) {
            console.log("Error in adding party ", error);
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box style={{
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
                }}>
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={newPartyRegister}>
                        <div style={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
                            <TextField margin='normal' id="party-name" label="Party Name" name='partyName' value={inputData.partyName} onChange={handleInputChange} variant="outlined" required />
                            <TextField margin='normal' id="mail" label="Email" name='email' value={inputData.email} onChange={handleInputChange} variant="outlined" required />
                            <TextField margin='normal' id="pan" label="Pan No." name='pan' value={inputData.pan} onChange={handleInputChange} variant="outlined" required />
                            <TextField margin='normal' id="contact" label="Contact No." name='contact' value={inputData.contact} onChange={handleInputChange} variant="outlined" required />
                            <TextField margin='normal' id="address" label="Address" name='address' value={inputData.address} onChange={handleInputChange} variant="outlined" required />
                            <TextField margin='normal' id="gst" label="GST No." name='gst' value={inputData.gst} onChange={handleInputChange} variant="outlined" required />
                        </div>
                        <div style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <h2 style={{ margin: '10px 0' }}>Bank Details</h2>
                            <div style={{
                                display: 'flex',
                                gap: "1rem"
                            }}>
                                <TextField margin='normal' id="bank-name" label="Bank Name" name='bankName' value={inputData.bankName} onChange={handleInputChange} variant="outlined" required />
                                <TextField margin='normal' id="account-no" label="Account Number" name='bankAccountNo' value={inputData.bankAccountNo} onChange={handleInputChange} variant="outlined" required />
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" type='submit' style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Save</Button>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: '12px' }} onClick={onClose}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AddParty
