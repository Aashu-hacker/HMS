import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import AddService from "./AddService";
import Page from '@layout/Page';
import global_css from "../../../components/Global.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditService from "./EditService";
import REACT_APP_BASE_URL from "API/api";
import { useToast } from '@chakra-ui/react';

const Servicedetails = () => {
  const [serverData, setServerData] = useState([
    {
      serviceName: "Service Name",
      serviceCode: "Service Code",
      serviceGroup: "Service Group",
      accountLedger: "Account Ledger",
      patientType: "Patient Type",
      charge: "120",
    }
  ]);
  const [showData, setShowData] = useState(serverData);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const toast = useToast()
  const [type, setType] = useState("add");
  const [editData, setEditData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const openDeleteModalFun = (id) => {
    setDeleteId(id)
    setOpenDeleteModal(true);
  };

  const openRegistration = () => {
    setOpenRegistrationModal(true);
    setType("add");
  };

  const closeRegistration = () => {
    setOpenRegistrationModal(false);
    setOpenDeleteModal(false)
  };

  const getData = async () => {
    
  };

  useEffect(() => {
    getData();
  }, []);

  const filterData = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = serverData.filter((item) => {
      return (
        item.designationName.toLowerCase().includes(searchValue) ||
        item.designationCode.toLowerCase().includes(searchValue)
      );
    });
    setShowData(filteredData);
  };

  const handleEdit = (item) => {
    setType(!type);
    setOpenRegistrationModal(true);
    setEditData(item);
  };

  const deleteDepartment = async (id) => {
    toast({
      title: `Deleted Successfully ${id}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  };

  return (
    <Page title="Service details">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
          <button className={global_css.global_btn} onClick={openRegistration}>+ Add</button>
          <input
            className={global_css.search_input}
            type="search"
            placeholder="Search..."
            onChange={filterData}
          />
        </div>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Sr No.</TableCell>
                  <TableCell >
                    service Name
                  </TableCell>
                  <TableCell >
                    Service Code
                  </TableCell>
                  <TableCell>Service Group</TableCell>
                  <TableCell >Account Ledger</TableCell>
                  <TableCell >Patient Type</TableCell>
                  <TableCell >Charge</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData && showData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>No Data Found</TableCell>
                  </TableRow>
                ) : (
                  showData && showData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell >{index + 1}</TableCell>
                      <TableCell >{item.serviceName}</TableCell>
                      <TableCell >{item.serviceCode}</TableCell>
                      <TableCell >{item.serviceGroup}</TableCell>
                      <TableCell >{item.accountLedger}</TableCell>
                      <TableCell >{item.patientType}</TableCell>
                      <TableCell >{item.charge}</TableCell>
                      <TableCell >
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal
          open={openRegistrationModal}
          onClose={closeRegistration}
        >
          {type === "add" ? (
            <AddService handleClose={closeRegistration} getData={getData} />
          ) : (
            <EditService handleClose={closeRegistration} editData={editData} getData={getData} />
          )}
        </Modal>
        <Modal
          open={openDeleteModal}
          onClose={closeRegistration}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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

export default Servicedetails;
