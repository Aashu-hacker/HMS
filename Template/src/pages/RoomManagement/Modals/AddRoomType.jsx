import { Box, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'

const AddRoomType = ({ open, onClose }) => {
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
                    <h1>Add New Room Type</h1>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField style={{ width: '500px' }} id="room-type" label="Room Type" margin='normal' variant="outlined" />
                        <TextField style={{ width: '500px' }} id="description" multiline maxRows={4} margin='normal' label="Description" variant="outlined" />
                        <TextField style={{ width: '500px' }} id="account-ledger" label="Account Ledger" margin='normal' variant="outlined" />
                        <div style={{ margin: '14px 8px' }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Save</Button>
                            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: "12px" }}>Cancel</Button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AddRoomType
