import { Box, Button, Modal, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    popUp: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
    },
}));

const EditParty = ({ open, onClose, onEdit, editPartyData }) => {
    const classes = useStyles();
    const [inputData, setInputData] = React.useState(editPartyData || {})

    const handleInputChange = (e) => {
        setInputData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    React.useEffect(() => {
        setInputData(editPartyData || {});
    }, [editPartyData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(inputData);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.popUp} >
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
                            <TextField margin='normal' id="party-name" label="Party Name" name='partyName' value={inputData.partyName || ''} onChange={handleInputChange} variant="outlined" />
                            <TextField margin='normal' id="mail" label="Email" name='email' value={inputData.email || ''} onChange={handleInputChange} variant="outlined" />
                            <TextField margin='normal' id="pan" label="Pan No." name='pan' value={inputData.pan || ''} onChange={handleInputChange} variant="outlined" />
                            <TextField margin='normal' id="contact" label="Contact No." name='contact' value={inputData.contact || ''} onChange={handleInputChange} variant="outlined" />
                            <TextField margin='normal' id="address" label="Address" name='address' value={inputData.address || ''} onChange={handleInputChange} variant="outlined" />
                            <TextField margin='normal' id="gst" label="GST No." name='gst' value={inputData.gst || ''} onChange={handleInputChange} variant="outlined" />
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
                                <TextField margin='normal' id="bank-name" label="Bank Name" name='bankName' value={inputData.bankName || ''} onChange={handleInputChange} variant="outlined" />
                                <TextField margin='normal' id="account-no" label="Account Number" name='bankAccountNo' value={inputData.bankAccountNo || ''} onChange={handleInputChange} variant="outlined" />
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" type='submit' style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Update</Button>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: '12px' }} onClick={onClose}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default EditParty
