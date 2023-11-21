import React from 'react'
// import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


function AddDepartment() {

    const openRegistration = () => {
        setOpenRegistrationModal(true);
    };

    const closeRegistration = () => {
        setOpenRegistrationModal(false);
    };
  return (
        <Dialog open={openRegistrationModal} onClose={closeRegistration}>
            <DialogTitle>Add Department</DialogTitle>
            <DialogContent>
                {/* Place your registration form or content here */}
                {/* For example, you can create a form with input fields */}
                <form>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeRegistration} color="secondary">
                    Cancel
                </Button>
                <Button onClick={closeRegistration} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
  )
}

export default AddDepartment
