import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import style from "./Payment_category.module.css";
import CustomCss from "../../../components/Global.module.css";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { MenuItem } from "@mui/base";
import { Select } from "@mui/material";

const PatientPayee = () => {
  const [openPatient, setOpenPatient] = useState(false);
  const [data2, setData2] = useState({
    payee: "",
    parentMaster: "",
    rateChart: "",
    parentGroup: "",
    address: "",
    lic: "",
    incorporate: "",
    mou: "",
    renewal: "",
  });

  const changePatientPayee = (e) => {
    const newData = { ...data2 };
    newData[e.target.name] = e.target.value;
    setData2(newData);
  };

  const handleSavePP = () => {
    setOpenPatient(false);
  };

  const handleClose = () => {
    setOpenPatient(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button
        onClick={() => setOpenPatient(true)}
        className={CustomCss.global_btn}
      >+Add</button>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Payee</TableCell>
              <TableCell>Parent Master</TableCell>
              <TableCell>Chart Master</TableCell>
              <TableCell>Parent Group</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Lic.no.</TableCell>
              <TableCell>Date of Incorporate</TableCell>
              <TableCell>Date of MOU</TableCell>
              <TableCell>Renewal Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openPatient}
        onClose={handleClose}
        className={style.add_container}
      >
        <DialogTitle className={style.add_header}>
          <h1>Patient Payee</h1>
          <RxCross2 onClick={handleClose} className={style.close_icon} />
        </DialogTitle>
        <DialogContent className={style.form_group}>
          <TextField
            onChange={changePatientPayee}
            name="payee"
            type="text"
            label="Payee"
            variant="standard"
            fullWidth
            value={data2.payee}
          />
          <TextField
            onChange={changePatientPayee}
            name="parentMaster"
            type="text"
            label="Parent Master"
            variant="standard"
            fullWidth
            value={data2.parentMaster}
          />
          <TextField
            onChange={changePatientPayee}
            name="rateChart"
            type="text"
            label="Rate Chart"
            variant="standard"
            fullWidth
            value={data2.rateChart}
          />
          <label htmlFor="parentGroup">Parent Group</label>
          <Select
            onChange={changePatientPayee}
            name="parentGroup"
            value={data2.parentGroup}
            fullWidth
            variant="standard"
            placeholder="Select here.."
          >
            <MenuItem value="insurance">Insurance</MenuItem>
            <MenuItem value="corporate">Corporate</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
          </Select>
          <TextField
            onChange={changePatientPayee}
            name="address"
            type="text"
            placeholder="Enter here.."
            variant="standard"
            fullWidth
            value={data2.address}
            label="Address"
          />
          <TextField
            onChange={changePatientPayee}
            name="lic"
            type="number"
            placeholder="Number"
            variant="standard"
            fullWidth
            value={data2.lic}
            label="LIC"
          />
          <label htmlFor="mou">Date of Incorporate</label>
          <TextField
            onChange={changePatientPayee}
            name="incorporate"
            type="date"
            variant="standard"
            fullWidth
            value={data2.incorporate}
          />
          <label htmlFor="mou">Date of MOU</label>
          <TextField
            onChange={changePatientPayee}
            name="mou"
            type="date"
            placeholder="Enter here.."
            variant="standard"
            fullWidth
            value={data2.mou}
          />
          <label htmlFor="renewal">Renewal Date</label>
          <TextField
            onChange={changePatientPayee}
            name="renewal"
            type="date"
            placeholder="Enter here.."
            variant="standard"
            fullWidth
            value={data2.renewal}
          />
          <div className={style.button_group}>
            <button
              onClick={handleSavePP}
              className={style.save_btn}
              variant="contained"
              color="primary"
            >
              Save
            </button>
            <button
              type="reset"
              className={CustomCss.global_btn}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientPayee;
