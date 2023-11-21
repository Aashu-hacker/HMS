import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "../StaffNav.css";
import BasicDetails from "../BasicDetails";
import EducationalDetails from "../EducationalDetails";
import AddressDetails from "../AddressDetails";
import BankingDetails from "../BankingDetails";
import Page from "@layout/Page";
import DocumentUpload from "../DocumentsUpload";
import custom from "../../../components/Global.module.css";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddForm = () => {
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState("BasicDetails");
  const type = "Nursing";
  return (
    <>
      <div className="staff-nav">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            className="label"
            label="Basic Details"
            onClick={() => setToggle("BasicDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Address Details"
            onClick={() => setToggle("AddressDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Educational Details"
            onClick={() => setToggle("EducationalDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Banking Details"
            onClick={() => setToggle("BankingDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Document Upload"
            onClick={() => setToggle("DocumentUpload")}
          />
        </BottomNavigation>
      </div>
      <p style={{ color: "rgb(8, 155, 171)", fontSize: "1.2rem", fontWeight: "650", margin: "1rem 0" }}>{toggle}</p>
      {toggle === "BasicDetails" ? (
        <BasicDetails type={type} />
      ) : toggle === "EducationalDetails" ? (
        <EducationalDetails type={type} />
      ) : toggle === "AddressDetails" ? (
        <AddressDetails type={type} />
      ) : toggle === "BankingDetails" ? (
        <BankingDetails type={type} />
      ) : toggle === "DocumentUpload" ? (
        <DocumentUpload />
      ) : null}
    </>
  );
};

const Nursing = () => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const open = () => {
    setButtonToggle(true);
  }

  const close = () => {
    setButtonToggle(false);
  }

  return (
    <Page title="Nursing Staff">
      {buttonToggle ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className={custom.global_btn} onClick={close}>
              close
            </button>
          </div>
          <AddForm />
        </>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <button className={custom.global_btn} onClick={open}>+Add Nursing</button>
            <input className={custom.search_input} placeholder="Search Staff" />
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Department Table">
              <TableHead
                sx={{ backgroundColor: "rgb(8,155,171)", color: "white" }}
              >
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Dilip Trilockchand Lovevanshi</TableCell>
                  <TableCell>7775026258</TableCell>
                  <TableCell>dilip.49@gmail.com</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
      }
    </Page>
  );
}

export default Nursing;



