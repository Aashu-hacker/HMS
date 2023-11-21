import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Page from '@layout/Page';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';
import { Autocomplete, Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { size } from 'lodash';
import EditRateMaster from './Modals/EditRateMaster';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
//   download: {
//     display: 'flex',
//     justifyContent: 'space-between'
//   },
//   uploadButton: {
//     display: 'none',
//   },
//   uploadLabel: {
//     backgroundColor: "rgb(8,155,171)",
//     color: "white",
//     padding: '10px 20px',
//     cursor: 'pointer',
//   },
//   rmBtn: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//     marginTop: '1.5rem'
//   },
//   popUp: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     borderRadius: '8px',
//     padding: '30px'
//   },
//   form: {
//     display: "flex",
//     flexDirection: 'column',
//   },
//   input: {
//     width: '500px'
//   },
//   btn: {
//     margin: '10px 0'
//   },
//   search: {
//     border: '1px solid rgb(8, 144, 171)',
//     padding: '4px 10px',
//     borderRadius: '4px',
//     fontSize: '18px'
//   },
//   category: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   }
// }));

function RateMaster() {
  const classes = useStyles();
  const bedFileRef = useRef(null);
  const rateFileRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const autoADD = [
    { label: 'Yes' },
    { label: 'No' }
  ]

  const handleBedChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        console.log("File Data: ", fileData);
      };
      reader.readAsText(file);
    } else {
      console.error("No file selected.");
    }
  }

  const handleRateChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target.result;
        console.log("File Data: ", fileData);
      };
      reader.readAsText(file);
    } else {
      console.error("No file selected.");
    }
  }

  const handleBedFileData = () => {
    bedFileRef.current.click()
  }

  const handleRateFileData = () => {
    rateFileRef.current.click()
  }

  return (
    <>
      <Page title='Rate Master'>
        <div className={classes.rmBtn}>
          <div className={classes.download}>
            <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Bed Master</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.popUp}>
                <h1>Bed Master</h1>
                <form className={classes.form}>
                  <TextField margin='normal' className={classes.input} id="bedName" label="Bed Name" variant="outlined" />
                  <TextField margin='normal' className={classes.input} id="roomType" label="Room Type" variant="outlined" />
                  <TextField margin='normal' className={classes.input} id="category" label="Category" variant="outlined" />
                  <TextField margin='normal' className={classes.input} id="charge" label="Charge" variant="outlined" />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={autoADD}
                    className={classes.input}
                    renderInput={(params) => <TextField {...params} margin='normal' label="Auto Add" variant='outlined' />}
                  />
                  <TextField margin='normal' className={classes.input} id="accountLedger" label="Account Ledger" variant="outlined" />
                  <TextField margin='normal' className={classes.input} id="billingGroup" label="Billing Group" variant="outlined" />
                  <div style={{ marginTop: '12px' }}>
                    <Button variant="contained" className={classes.btn} style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Save</Button>
                    <Button variant="contained" className={classes.btn} style={{ backgroundColor: "rgb(8,155,171)", color: "white", marginLeft: '12px' }}>Cancel</Button>
                  </div>
                </form>
              </Box>
            </Modal>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Download</Button>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }} onClick={handleBedFileData}>Upload File</Button>
            <input type='file' accepts='.xlsx' ref={bedFileRef} onChange={handleBedChange} style={{ display: "none" }} />
          </div>
          <div className={classes.download}>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Rate Master</Button>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Download</Button>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }} onClick={handleRateFileData}>Upload File</Button>
            <input type='file' accepts='.xlsx' ref={rateFileRef} onChange={handleRateChange} style={{ display: "none" }} />
          </div>
          <hr />
          <div className={classes.category}>
            <Button variant="contained" style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>Category</Button>
            <input type='text' className={classes.search} placeHolder='Search Category' />
          </div>
        </div>
        <EditRateMaster open={editOpen} onClose={handleEditClose} />
        <Paper className={classes.root}>
          <TableContainer>
            <Table className={classes.table} aria-label="Department Table">
              <TableHead style={{ backgroundColor: "rgb(8,155,171)" }}>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Room No.</TableCell>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>G W 1</TableCell>
                  <TableCell>General Ward</TableCell>
                  <TableCell>1200</TableCell>
                  <TableCell>Cash</TableCell>
                  <TableCell>1st floor</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon onClick={handleEditOpen} />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Page>
    </>
  );
}

export default RateMaster;


