import { Box, Button, Modal, TextField } from '@mui/material'
import React from 'react'

const EditRateMaster = ({ open, onClose }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                    <h1>Edit Bed Master</h1>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField margin='normal' style={{ width: '500px' }} id="roomNo" label="Room No." variant="outlined" />
                        <TextField margin='normal' style={{ width: '500px' }} id="roomType" label="Room Type" variant="outlined" />
                        <TextField margin='normal' style={{ width: '500px' }} id="rate" label="Rate" variant="outlined" />
                        <TextField margin='normal' style={{ width: '500px' }} id="category" label="Category" variant="outlined" />
                        <TextField margin='normal' style={{ width: '500px' }} id="location" label="Location" variant="outlined" />
                        <div style={{ marginTop: '12px' }}>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Save</Button>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: '12px' }}>Cancel</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default EditRateMaster
