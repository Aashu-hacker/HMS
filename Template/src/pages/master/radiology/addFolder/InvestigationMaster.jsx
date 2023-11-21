import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import CustomCss from "../../../../components/Global.module.css"

const InvestigationMaster = ({ onClose }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <h1>Investigation Master</h1>
      <form>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1rem",
          }}
        >
          <FormControl margin="normal" variant="outlined" fullWidth>
            <InputLabel variant="outlined">Department</InputLabel>
            <Select label="Department" value="Male">
              <MenuItem value="Male">Test 1</MenuItem>
              <MenuItem value="Female">Test 2</MenuItem>
              <MenuItem value="Other">Test 3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Test Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="machine Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Test Type"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Unit"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Teste Range"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="description"
            variant="outlined"
            margin="normal"
          />
        </div>
        <div>
          <button className={CustomCss.global_btn}>Save</button>
          <button className={CustomCss.global_btn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default InvestigationMaster;
