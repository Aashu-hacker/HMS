import React, { useState } from "react";
import Page from "@layout/Page";
import CustomCss from "../../../components/Global.module.css";
import { RxCross2 } from "react-icons/rx";
import style from "./Payment_category.module.css"
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@mui/material";

const PayeeParent = () => {
  const [openPatientCategory, setOpenPatientCategory] = useState(false);

  const [data, setData] = useState({
    parentMaster: "",
    rateChart: "",
    parentGroup: "",
  });

  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const openPatientCategoryDialog = () => {
    setOpenPatientCategory(true);
  };

  const handleClose = () => {
    setOpenPatientCategory(false);
  };

  const handleSaveData = () => {
    setOpenPatientCategory(false);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={openPatientCategoryDialog} className={CustomCss.global_btn}>+add</button>
      <TableContainer >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell>Parent Master</TableCell>
                  <TableCell>Rate Chart</TableCell>
                  <TableCell>Parent Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>doctor</TableCell>
                  <TableCell>PKMB</TableCell>
                  <TableCell>Cash</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </TableContainer>

      <Dialog open={openPatientCategory} onClose={handleClose}>
        <DialogTitle className={CustomCss.add_header}>
          <h1>Patient Master</h1>
          <RxCross2 onClick={handleClose} />

        </DialogTitle>
        <DialogContent >

          <TextField
            onChange={handleData}
            margin="normal"
            name="parentMaster"
            type="text"
            variant="outlined"
            label="Parent Master"
            fullWidth
            value={data.parentMaster}
          />

          <TextField
            onChange={handleData}
            margin="normal"
            name="rateChart"
            type="text"
            variant="outlined"
            label="Parent Master"
            fullWidth
            value={data.rateChart}
          />
          <Autocomplete
            onChange={handleData}
            name="parentGroup"
            type="text"
            variant="outlined"
            label="Parent Group"
            fullWidth
            options={["Insurance", "Cash", "Corporate"]}
            value={data.parentGroup}
            renderInput={(params) => (
              <TextField {...params} label="Parent Group" variant="outlined" margin="normal" />
            )}
          />

          <div style={{ marginTop: "1rem", float: "right" }}>
            <button
              onClick={handleSaveData}
              className={CustomCss.global_btn}
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className={CustomCss.global_btn}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayeeParent;
