import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

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

const DeleteParty = ({ open, onClose, onDelete, deletedParty }) => {
    const classes = useStyles();
    const handleDelete = () => {
        onDelete(deletedParty);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirmation-title"
            aria-describedby="delete-confirmation-description"
        >
            <Box className={classes.popUp} >
                <h2 style={{ textAlign: 'center' }}>Are you sure?</h2>
                <div>
                    <Button variant="contained" style={{ margin: '10px', backgroundColor: "red" }} onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="contained" style={{ margin: '10px' }} color="primary" onClick={onClose}>
                        No
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteParty;
