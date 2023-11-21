import React, { useState } from "react";
import {
  Dialog,
  TableBody,
  TableCell,
  TableRow,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import { Table, TableContainer, TableHead } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./Payment_category.module.css";
import CustomCss from "../../../components/Global.module.css"

const ParentGroup = () => {
  const [openParentGroup, setOpenParentGroup] = useState(false);

  const handleSaveData = () => {
    setOpenParentGroup(false);
  };

  const handleClose = () => {
    setOpenParentGroup(false);
  };

  const handleOpen = () => {
    setOpenParentGroup(true);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={handleOpen} className={CustomCss.global_btn}
      >+add</button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell>Parent Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Parent Group</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={openParentGroup} onClose={handleClose}>
        <DialogTitle className={style.add_header}>
          <h1>Parent Group</h1>
          <IconButton onClick={handleClose} className={style.close_icon}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={style.form_group_large}>
          <TextField
            name="designationName"
            type="text"
            variant="outlined"
            label="Parent Group"
            fullWidth
          />
          <div className={style.button_group}>
            <button
              onClick={handleSaveData}
              className={CustomCss.global_btn}
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

export default ParentGroup;
