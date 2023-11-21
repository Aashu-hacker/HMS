import React, { useState } from "react";
import Page from "@layout/Page";
import CustomCss from "../../../components/Global.module.css";
import { Button } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useToast } from '@chakra-ui/react';
import REACT_APP_BASE_URL from '../../../API/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutSource from './add_edit/AddOutSource';
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import EditOutsource from "./add_edit/EditOutsource";

const Outsource_diagnostics = () => {
  const [outsourceDiagnostic, setOutsourceDiagnostic] = useState([])
  const [type, setType] = useState("add");
  const [editData, setEditData] = useState({});
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const handleEdit = (item) => {
    setType(!type);
    console.log(!type);
    setOpenRegistrationModal(true);
    setEditData(item);
  };

  const closeRegistration = () => {
    setOpenRegistrationModal(false);
    setOpenDeleteModal(false);
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}outsourceDiagnostic-master/delete/${id}`, {
        method: 'PUT',
      });
      console.log(response);
      if (response.ok) {
        getOutsourceDiagnostics();
        toast({
          title: 'Outsource Diagnostics deleted!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
        setOpenDeleteModal(false);
      } else {
        toast({
          title: 'Failed to delete Outsource Diagnostics!!',
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

  async function getOutsourceDiagnostics() {
    const respose = await fetch(`${REACT_APP_BASE_URL}outsourceDiagnostic-master`);
    const data = await respose.json();
    setOutsourceDiagnostic(data.data);
  }

  useEffect(() => {
    getOutsourceDiagnostics()
  }, []);

  return (
    <Page title="Outsource Diagnostics">
      <div>
        <div >
          <button className={CustomCss.global_btn}>Download Rate Master</button>
          <button className={CustomCss.global_btn} onClick={openRegistration}>+Add</button>
        </div>
        <Paper>
          <TableContainer>
            <Table aria-label="Department Table">
              <TableHead>
                <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell> Outsourced Lab Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outsourceDiagnostic && outsourceDiagnostic.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="5">No Data Found</TableCell>
                  </TableRow>
                ) :
                  (outsourceDiagnostic && outsourceDiagnostic.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.labName}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.departmentName}</TableCell>
                        <TableCell>
                          <IconButton color="primary">
                            <EditIcon
                              onClick={() => handleEdit(item)}
                            />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => openDeleteModalFun(item._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal
          open={openRegistrationModal}
          onClose={closeRegistration}
        >
          {type === "add" ? (
            <AddOutSource
              save={closeRegistration}
              handleClose={closeRegistration}
              update={getOutsourceDiagnostics}
            />
          ) : (
            <EditOutsource handleClose={closeRegistration} item={editData} update={getOutsourceDiagnostics} />
          )}
        </Modal>
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

export default Outsource_diagnostics;
