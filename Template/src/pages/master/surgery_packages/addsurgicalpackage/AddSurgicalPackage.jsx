import React, { useState } from "react";
import CustomCss from "../../../../components/Global.module.css";
import { TextField, Container, Paper, Grid } from "@material-ui/core";
import Page from "@layout/Page";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router";

const AddSurgicalPackage = () => {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState({
    SurgeryName: "",
    surgeryCode: "",
    category: "",
    accountLedger: "",
    amount: "",
    description: "",
    department: "",
    status: "",
    surgeryType: "",
    anesthesia: "",
    anesthesiaType: "",
    surgeryMode: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Page title="Add Surgical Package">
        <Container maxWidth="xl">
          <button className={CustomCss.global_btn}
            onClick={() => naviagte(-1)}
          >Go back</button>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "3rem" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Surgery Name"
                    type="text"
                    name="SurgeryName"
                    value={formData.SurgeryName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Surgery Code"
                    type="text"
                    name="surgeryCode"
                    value={formData.surgeryCode}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Account Ledger"
                    name="accountLedger"
                    value={formData.accountLedger}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <FormControl margin="normal">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <FormControlLabel
                        value="active"
                        control={<Radio />}
                        label="Active"
                      />
                      <FormControlLabel
                        value="inActive"
                        control={<Radio />}
                        label="In Active"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="surgeryType">Surgery Type</InputLabel>
                    <Select
                      label="Surgery Type"
                      name="surgeryType"
                      value={formData.surgeryType}
                      onChange={handleChange}
                      required
                      margin=""
                    >
                      <MenuItem value="major">Major</MenuItem>
                      <MenuItem value="minor">Minor</MenuItem>
                      <MenuItem value="superMajor">Super Major</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="anesthesia">Anesthesia</InputLabel>
                    <Select
                      label="Anesthesia"
                      name="anesthesia"
                      value={formData.anesthesia}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="with">With</MenuItem>
                      <MenuItem value="without">Without</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="anesthesiaType">
                      Anesthesia Type
                    </InputLabel>
                    <Select
                      label="Anesthesia Type"
                      name="anesthesiaType"
                      value={formData.anesthesiaType}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="longGA">Long GA</MenuItem>
                      <MenuItem value="shortGA">Short GA</MenuItem>
                      <MenuItem value="spinal">Spinal</MenuItem>
                      <MenuItem value="regional">Regional</MenuItem>
                      <MenuItem value="local">Local</MenuItem>
                      <MenuItem value="observation">Obervation</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="surgeryMode">Surgery Mode</InputLabel>
                    <Select
                      label="Surgery Mode"
                      name="surgeryMode"
                      value={formData.surgeryMode}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="diagnostive">Diagnostive</MenuItem>
                      <MenuItem value="operative">Operative</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ marginTop: "20px", textAlign: "end" }}>
                <button type="submit" className={CustomCss.global_btn}>
                  Save
                </button>
                <button type="reset" className={CustomCss.global_btn}>
                  Cancel
                </button>
              </div>
            </form>
          </Paper>
        </Container>
      </Page>
    </>
  );
};

export default AddSurgicalPackage;
