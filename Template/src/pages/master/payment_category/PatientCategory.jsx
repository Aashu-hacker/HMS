import React, { useState } from "react";
import Page from "@layout/Page";
import CustomCss from "../../../components/Global.module.css";
import { RxCross2 } from "react-icons/rx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

const PatientCategory = () => {
  const [openPatientCategory, setOpenPatientCategory] = useState(false);

  const [data, setData] = useState({
    designationName: "",
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
    <>
      <TableContainer style={{ marginTop: "2rem" }}>
        <button className={CustomCss.global_btn}
          onClick={openPatientCategoryDialog}>+Add</button>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell>Patient Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Abc</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </TableContainer>
      <Dialog open={openPatientCategory} onClose={handleClose}>
        <DialogTitle className={CustomCss.add_header}>
          <h1>Patient Category</h1>
          <RxCross2 onClick={handleClose} />
        </DialogTitle>
        <DialogContent className={CustomCss.form_group}>
          <label htmlFor="designationName">Patient Category</label>
          <TextField
            onChange={handleData}
            name="designationName"
            type="text"
            placeholder="Enter here.."
            variant="outlined"
            fullWidth
            value={data.designationName}
          />
          <div className={CustomCss.button_group}>
            <button
              onClick={handleSaveData}
              className={CustomCss.save_btn}
              variant="contained"
              color="primary"
            >
              Save
            </button>
            <button
              type="reset"
              className={CustomCss.cancel_btn}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientCategory;
