import React, { useState } from "react";
import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Page from "@layout/Page";
import CustomCss from "../../../components/Global.module.css";
import InvestigationMaster from "./addForms/InvestigationMaster";
import MachineMaster from "./addForms/MachineMaster";
import Specimen from "./addForms/Specimen";
import Unit from "./addForms/Unit";
import DummyData from "./DummyData";

function createData(
  name,
  department,
  testCode,
  investigationRange,
  testType,
  formula,
  notes,
  parameters
) {
  return {
    name,
    department,
    testCode,
    investigationRange,
    testType,
    formula,
    notes,
    parameters,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.department}</TableCell>
        <TableCell>{row.testCode}</TableCell>
        <TableCell>{row.investigationRange}</TableCell>
        <TableCell>{row.testType}</TableCell>
        <TableCell>{row.formula}</TableCell>
        <TableCell>{row.notes}</TableCell>
        <TableCell>
          <EditIcon className={CustomCss.global_btn_icon} />
          <DeleteIcon className={CustomCss.global_btn_icon} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#eee" }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Parameters
                {" "}
                <button className={CustomCss.global_btn}>+Add</button>
              </Typography>
              <Table size="small" aria-label="parameters">
                <TableHead>
                  <TableRow>
                    <TableCell>Components</TableCell>
                    <TableCell>Your Value</TableCell>
                    <TableCell>Standard Range</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.parameters.map((param) => (
                    <TableRow key={param.id}>
                      <TableCell>{param.components}</TableCell>
                      <TableCell>{param.yourValue}</TableCell>
                      <TableCell>{param.standardRange}</TableCell>
                      <TableCell>{param.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    department: PropTypes.string.isRequired,
    testCode: PropTypes.string.isRequired,
    investigationRange: PropTypes.string.isRequired,
    testType: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    parameters: PropTypes.arrayOf(
      PropTypes.shape({
        components: PropTypes.string.isRequired,
        yourValue: PropTypes.string.isRequired,
        standardRange: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = DummyData.map((data) =>
  createData(
    data.InvestigationName,
    data.department,
    data.testCode,
    data.investigationRange,
    data.testType,
    data.formula,
    data.notes,
    data.parameters
  )
);

const Pathology = () => {
  const [openModal, setOpenModal] = useState(false);
  const [toggle, setToggle] = useState("InvestigationMaster");

  const openFormModal = (formName) => {
    setOpenModal(true);
    setToggle(formName);
  };

  const closeFormModal = () => {
    setOpenModal(false);
  };

  return (
    <Page title="Pathology">
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
              <InvestigationMaster onClose={closeFormModal} />
            ) : toggle === "Method/MachineMaster" ? (
              <MachineMaster onClose={closeFormModal} />
            ) : toggle === "SpecimenMaster" ? (
              <Specimen onClose={closeFormModal} />
            ) : toggle === "UnitMaster" ? (
              <Unit onClose={closeFormModal} />
            ) : null}
          </Modal>
        </div>
        <Paper>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Investigation Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Test Code</TableCell>
                  <TableCell>Investigation Range</TableCell>
                  <TableCell>Test Type</TableCell>
                  <TableCell>Formula</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Page>
  );
};

export default Pathology;
