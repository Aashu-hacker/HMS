import React, { useState, useEffect } from "react";
import style from "./Designation.module.css";
import Modal from "@mui/material/Modal";
import AddDesignation from "@pages/master/designation/AddDesignation";
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
import EditDesignation from "./Editdesignation";
import REACT_APP_BASE_URL from "API/api";
import { useToast } from '@chakra-ui/react';
import NoDataPlaceholder from "@components/NoDataPlaceholder";

const Designation = () => {
  const [serverData, setServerData] = useState([]);
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
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}designation-master`);
      if (response.ok) {
        const data = await response.json();
        setServerData(data.data);
        setShowData(data.data);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    console.log(!type);
    setOpenRegistrationModal(true);
    setEditData(item);
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}designation-master/delete/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        getData();
        toast({
          title: 'Designation deleted!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
        setOpenDeleteModal(false);
      } else {
        toast({
          title: 'Failed to delete Designation!!',
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

  return (
    <Page title="Designation">
      <div>
        <div className={style.top_bar}>
          <button className={global_css.global_btn} onClick={openRegistration}>+ Add</button>
          <input
            className={style.search_input}
            type="search"
            placeholder="Search..."
            onChange={filterData}
          />
        </div>
        <Paper>
          <TableContainer style={{ height: "90vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Sr No.</TableCell>
                  <TableCell >
                    Designation Name
                  </TableCell>
                  <TableCell >
                    Designation Code
                  </TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData && showData.length === 0 ? (
                  <NoDataPlaceholder/>
                ) : (
                  showData && showData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell >{index + 1}</TableCell>
                      <TableCell>{item.designationName}</TableCell>
                      <TableCell>{item.designationCode}</TableCell>
                      <TableCell >{item.description}</TableCell>
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
            <AddDesignation handleClose={closeRegistration} getData={getData} />
          ) : (
            <EditDesignation handleClose={closeRegistration} editData={editData} getData={getData} />
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

export default Designation;
