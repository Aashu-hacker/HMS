import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Page from '@layout/Page';
import Add from './add_edit/Add';
import Edit from './add_edit/Edit';
import { useEffect } from 'react';
import Modal from "@mui/material/Modal";
import { useToast } from '@chakra-ui/react';
import REACT_APP_BASE_URL from 'API/api';

const StoreMaster = () => {
  const [storeData, setStoreData] = useState([])
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [type, setType] = useState("add");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const toast = useToast()

  const openDeleteModalFun = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const openRegistration = () => {
    setOpenRegistrationModal(true);
    setType("add");
  };

  const closeRegistration = () => {
    setOpenRegistrationModal(false);
    setOpenDeleteModal(false);
  };

  const handleEdit = (item) => {
    setType(!type);
    setOpenRegistrationModal(true);
    setEditData(item);
  };

  async function FetchData() {
    const respose = await fetch(`${REACT_APP_BASE_URL}store-master`);
    const data = await respose.json();
    setStoreData(data.data);
  }

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}store-master/delete/${id}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        FetchData();
        toast({
          title: 'Store deleted!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
        setOpenDeleteModal(false);
      } else {
        toast({
          title: 'Failed to delete store!!',
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
  };

  useEffect(() => {
    FetchData()
  }, [])

  return (
    <Page title='Store' >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button variant="contained" onClick={openRegistration} style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>+ Add</Button>
        </div>
        <Modal
          open={openRegistrationModal}
          onClose={closeRegistration}
        >
          {type === "add" ? (
            <Add closeRegistration={closeRegistration} update={FetchData} />
          ) : (
            <Edit handleClose={closeRegistration} item={editData} update={FetchData} />
          )}
        </Modal>
        <Paper style={{ width: '100%', marginTop: '20px', overflowX: 'auto' }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Department Table">
              <TableHead sx={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Purchasing Status</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeData ?
                  storeData.map((store, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{store.storeName}</TableCell>
                      <TableCell>{store.location}</TableCell>
                      <TableCell>{store.description}</TableCell>
                      <TableCell>{store.purchasingStatus}</TableCell>
                      {/* <TableCell>Active</TableCell> */}
                      <TableCell>{store.department}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <EditIcon onClick={() => handleEdit(store)} />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => openDeleteModalFun(store._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                  : <span>No data found</span>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal
          open={openDeleteModal}
          onClose={closeRegistration}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div style={{ borderRadius: "10px", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px' }}>
            <h2>Delete Store?</h2>
            <div style={{ marginTop: "30px" }}>
              <Button type="submit" variant="contained" style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                onClick={() => deleteDepartment(deleteId)}
              >Yes</Button>
              <Button variant="contained" style={{ backgroundColor: "white", color: 'gray' }}
                onClick={() => closeRegistration()}
              >Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Page>
  );
};

export default StoreMaster;
