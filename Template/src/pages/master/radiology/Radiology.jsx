import React, { useState } from "react";
import style from "./Radiology.module.css";
import Page from '@layout/Page';
import data from "./data";
import CustomCss from '../../../components/Global.module.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "@mui/material";
import InvestigationMaster from "./addFolder/InvestigationMaster";
import MachineMaster from "./addFolder/MachineMaster";
import Specimen from "./addFolder/SpecimenMaster";
import Unit from "./addFolder/Unit";

const Radiology = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [toggle, setToggle] = useState("InvestigationMaster");

  const openFormModal = (formName) => {
    setOpenModal(true);
    setToggle(formName);
  };

  const closeFormModal = () => {
    setOpenModal(false);
  };

  const [description, setDescription] = useState({
    finding: "",
    observation: "",
    template_name: "",
  });

  const openRegistration = (item) => {
    setOpenRegistrationModal(true);
    setSelectedItem(item);
    setDescription({
      finding: item.finding,
      observation: item.observation,
      template_name: item.template_name,
    });
  };

  const closeRegistration = () => {
    setOpenRegistrationModal(false);
  };

  return (
    <Page title="Radiology">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className={CustomCss.global_btn}
            onClick={() => openFormModal("InvestigationMaster")}
          >
            Investigation Master
          </button>
          <button
            className={CustomCss.global_btn}
            onClick={() => openFormModal("Method/MachineMaster")}
          >
            Method/Machine Master
          </button>
          <button
            className={CustomCss.global_btn}
            onClick={() => openFormModal("SpecimenMaster")}
          >
            Specimen Master
          </button>
          <button
            className={CustomCss.global_btn}
            onClick={() => openFormModal("UnitMaster")}
          >
            Unit Master
          </button>

          <Modal open={openModal} onClose={closeFormModal}>
            {toggle === "InvestigationMaster" ? (
              <InvestigationMaster />
            ) : toggle === "Method/MachineMaster" ? (
              <MachineMaster onClose={closeFormModal} />
            ) : toggle === "SpecimenMaster" ? (
              <Specimen />
            ) : toggle === "UnitMaster" ? (
              <Unit />
            ) : null}
          </Modal>
        </div>
        <Paper >
          <TableContainer>
            <Table aria-label="Department Table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell >
                    Investigation Name
                  </TableCell>
                  <TableCell >Department</TableCell>
                  <TableCell >Test Code</TableCell>
                  <TableCell >
                    Investigation Range
                  </TableCell>
                  <TableCell >Formula</TableCell>
                  <TableCell >Notes</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      className={style.hover}
                      onClick={() => openRegistration(item)}
                    >
                      {item.investigation_name}
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.test_code}</TableCell>
                    <TableCell>{item.investigation_range}</TableCell>
                    <TableCell>{item.formula}</TableCell>
                    <TableCell>{item.notes}</TableCell>
                    <TableCell>
                      <IconButton
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog
          open={openRegistrationModal}
          onClose={closeRegistration}
        >
          <DialogTitle>
            {selectedItem && selectedItem.investigation_name}
          </DialogTitle>
          <DialogContent >
            <TextField
              label="Finding"
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              rows={4}
              value={description.finding}
              onChange={(e) =>
                setDescription({ ...description, finding: e.target.value })
              }
            />
            <TextField
              label="Observation"
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              rows={4}
              value={description.observation}
              onChange={(e) =>
                setDescription({ ...description, observation: e.target.value })
              }
            />
            <TextField
              label="Template Name"
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              value={description.template_name}
              onChange={(e) =>
                setDescription({ ...description, template_name: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <button onClick={closeRegistration}
              className={CustomCss.global_btn}>
              Cancel
            </button>
            <button onClick={closeRegistration}
              className={CustomCss.global_btn}>
              Save
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </Page>
  );
};

export default Radiology;
