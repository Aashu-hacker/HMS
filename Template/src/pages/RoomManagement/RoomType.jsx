import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Page from '@layout/Page';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoomType from './Modals/EditRoomType';
import AddRoomType from './Modals/AddRoomType';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  popUp: {
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
  },
  form: {
    display: "flex",
    flexDirection: 'column',
  },
  input: {
    width: '500px'
  },
  status: {
    display: 'flex',
    margin: '14px 8px'
  },
  btn: {

  }
}));

function RoomType() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  return (
    <>
      <Page title='Room Type'>
        <div className={classes.container}>
          <div className={classes.header}>
            <Button variant="contained" onClick={handleOpen} style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>New Room Type</Button>
            <AddRoomType open={open} onClose={handleClose} />
            <EditRoomType open={editOpen} onClose={handleEditClose} />
          </div>
          <Paper className={classes.root}>
            <TableContainer>
              <Table className={classes.table} aria-label="Department Table">
                <TableHead style={{ backgroundColor: "rgb(8,155,171)" }}>
                  <TableRow>
                    <TableCell>Sr No.</TableCell>
                    <TableCell>Room Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>General Ward</TableCell>
                    <TableCell>Description not available</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon onClick={handleEditOpen} />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>ICU</TableCell>
                    <TableCell>Description not available</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon onClick={handleEditOpen} />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Super Delux</TableCell>
                    <TableCell>Description not available</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon onClick={handleEditOpen} />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Private Room</TableCell>
                    <TableCell>Description not available</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon onClick={handleEditOpen} />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>Semi Private room</TableCell>
                    <TableCell>Description not available</TableCell>
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
        </div>
      </Page>
    </>
  );
}

export default RoomType