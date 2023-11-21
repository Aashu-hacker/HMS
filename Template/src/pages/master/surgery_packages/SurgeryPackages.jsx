import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "./SurgeryPackages.module.css";
import { useNavigate } from "react-router";
import customCss from "../../../components/Global.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Page from "@layout/Page";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import { InputLabel } from "@mui/material";
import global_css from "../../../components/Global.module.css";
import { MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => { });

const dummyData = [
  {
    id: 1,
    surgeryName: "Laparoscopy",
    surgeryCode: "LAP01",
    category: "Cash",
    department: "General",
    accountLedger: "surgical Revenue",
    amount: 3500,
    description: "it depend on user",
    status: "Active",
  },
  {
    id: 2,
    surgeryName: "name2",
    surgeryCode: "LAP02",
    category: "Cash",
    department: "General",
    accountLedger: "surgical Revenue",
    amount: 1500,
    description: "it depend on user",
    status: "Active",
  },
  {
    id: 3,
    surgeryName: "name3",
    surgeryCode: "LAP03",
    category: "Cash",
    department: "General",
    accountLedger: "surgical Revenue",
    amount: 3100,
    description: "it depend on user",
    status: "Active",
  }
];

localStorage.setItem("surgeryPackages", JSON.stringify(dummyData));

function SurgeryPackages() {
  const classes = useStyles();
  const bedFileRef = useRef(null);
  const navigate = useNavigate();

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileData = event.target.result;
        console.log("File Data: ", fileData);
      };
      reader.readAsText(file);
    } else {
      console.error("No file selected.");
    }
  };

  const handleBedFileData = () => {
    bedFileRef.current.click();
  };

  return (
    <Page title="Surgery Package">
      <>
        <div className={style.up_btn}>
          <button
            onClick={() => navigate("/add_surgical_package")}
            className={global_css.global_btn}
          >
            add new
          </button>
          <input
            type="text"
            placeholder="search..."
            className={customCss.search_input}
          />
        </div>
        <div className={style.bottom_btn}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel>Category</InputLabel>
            <Select label="Department">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="TPM">TPM</MenuItem>
              <MenuItem value="insurance">Insurance</MenuItem>
            </Select>
          </FormControl>
          <div>
            <button className={global_css.global_btn}>
              Download Package Master
            </button>
            <button
              className={global_css.global_btn}
              onClick={handleBedFileData}
            >
              Upload File
            </button>
            <input
              type="file"
              accepts=".xlsx"
              ref={bedFileRef}
              style={{ display: "none" }}
              onChange={uploadFile}
            />
          </div>
        </div>
      </>
      <Paper className={classes.root}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell>Surgery Name</TableCell>
                <TableCell>Surgery Code</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Account Ledger</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                dummyData.map((item) => (
                  <TableRow key={item.sn}>
                    <TableCell>{item.sn}</TableCell>
                    <TableCell className={style.highlight}><Link to={`/surgery_packages/${item.id}`}>{item.surgeryName}</Link></TableCell>
                    <TableCell>{item.surgeryCode}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.accountLedger}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <EditIcon className={style.edit_icon} />
                      <DeleteIcon className={style.delete_icon} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Page>
  );
}

export default SurgeryPackages;
