import React, { useState, useEffect } from "react";
import { TextField, Container, Grid } from "@material-ui/core";
import { useToast } from "@chakra-ui/react";
import styles from "../../components/Global.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";

const EducationalDetails = ({ type }) => {
  const initialEducationState = {
    stream: "",
    instituteName: "",
    passingYear: "",
    percentage: "",
  };

  const [education10th, setEducation10th] = useState(initialEducationState);
  const [education12th, setEducation12th] = useState(initialEducationState);
  const [educationGraduation, setEducationGraduation] = useState(
    initialEducationState
  );
  const [educationPostGraduation, setEducationPostGraduation] = useState(
    initialEducationState
  );
  const [educationOther, setEducationOther] = useState(initialEducationState);

  const [enable10th, setEnable10th] = useState(false);
  const [enable12th, setEnable12th] = useState(false);
  const [enableGraduation, setEnableGraduation] = useState(false);
  const [enablePostGraduation, setEnablePostGraduation] = useState(false);
  const [enableOther, setEnableOther] = useState(false);

  const toast = useToast();

  const handleChange = (event, educationSetter) => {
    const { name, value } = event.target;
    educationSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event, enableSetter) => {
    enableSetter(event.target.checked);
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const educationDetails = [];

    if (enable10th) educationDetails.push(education10th);
    if (enable12th) educationDetails.push(education12th);
    if (enableGraduation) educationDetails.push(educationGraduation);
    if (enablePostGraduation) educationDetails.push(educationPostGraduation);
    if (enableOther) educationDetails.push(educationOther);

    console.log(educationDetails);
    toast({
      title: "Educational Details Saved Successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {}, []);

  return (
   <Container maxWidth="xl">
      <form onSubmit={handleSubmitData}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={<Checkbox name="10th" />}
            onChange={(e) => handleCheckboxChange(e, setEnable10th)}
          />
          <h5>10th</h5>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stream"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleChange(e, setEducation10th)}
              value={education10th.stream}
              name="stream"
              {...(enable10th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="instituteName"
              value={education10th.instituteName}
              onChange={(e) => handleChange(e, setEducation10th)}
              {...(enable10th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Passing Year"
              type="number"
              name="passingYear"
              value={education10th.passingYear}
              onChange={(e) => handleChange(e, setEducation10th)}
              {...(enable10th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Percentage/CGPA"
              variant="outlined"
              margin="normal"
              type="number"
              name="percentage"
              value={education10th.percentage}
              onChange={(e) => handleChange(e, setEducation10th)}
              {...(enable10th ? {} : { disabled: true })}
            />
          </Grid>
        </Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={<Checkbox name="12th" />}
            onChange={(e) => handleCheckboxChange(e, setEnable12th)}
          />
          <h5>12th</h5>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stream"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleChange(e, setEducation12th)}
              value={education12th.stream}
              name="stream"
              {...(enable12th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="instituteName"
              value={education12th.instituteName}
              onChange={(e) => handleChange(e, setEducation12th)}
              {...(enable12th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Passing Year"
              type="number"
              name="passingYear"
              value={education12th.passingYear}
              onChange={(e) => handleChange(e, setEducation12th)}
              {...(enable12th ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Percentage/CGPA"
              variant="outlined"
              margin="normal"
              type="number"
              name="percentage"
              value={education12th.percentage}
              onChange={(e) => handleChange(e, setEducation12th)}
              {...(enable12th ? {} : { disabled: true })}
            />
          </Grid>
        </Grid>

        
        <div style={{display:"flex", alignItems:"center"}}>
        <FormControlLabel
          control={<Checkbox name="graduation" />}
          onChange={(e) => handleCheckboxChange(e, setEnableGraduation)}
        />
        <h5>Graduation</h5>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stream"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleChange(e, setEducationGraduation)}
              value={educationGraduation.stream}
              name="stream"
              {...(enableGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="instituteName"
              value={educationGraduation.instituteName}
              onChange={(e) => handleChange(e, setEducationGraduation)}
              {...(enableGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Passing Year"
              type="number"
              name="passingYear"
              value={educationGraduation.passingYear}
              onChange={(e) => handleChange(e, setEducationGraduation)}
              {...(enableGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Percentage/CGPA"
              variant="outlined"
              margin="normal"
              type="number"
              name="percentage"
              value={educationGraduation.percentage}
              onChange={(e) => handleChange(e, setEducationGraduation)}
              {...(enableGraduation ? {} : { disabled: true })}
            />
          </Grid>
        </Grid>
        
        <div style={{display:"flex", alignItems:"center"}}>
        <FormControlLabel
          control={<Checkbox name="postGraduation" />}
          onChange={(e) => handleCheckboxChange(e, setEnablePostGraduation)}
        />
        <h5>Post Graduation</h5>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stream"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleChange(e, setEducationPostGraduation)}
              value={educationPostGraduation.stream}
              name="stream"
              {...(enablePostGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="instituteName"
              value={educationPostGraduation.instituteName}
              onChange={(e) => handleChange(e, setEducationPostGraduation)}
              {...(enablePostGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Passing Year"
              type="number"
              name="passingYear"
              value={educationPostGraduation.passingYear}
              onChange={(e) => handleChange(e, setEducationPostGraduation)}
              {...(enablePostGraduation ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Percentage/CGPA"
              variant="outlined"
              margin="normal"
              type="number"
              name="percentage"
              value={educationPostGraduation.percentage}
              onChange={(e) => handleChange(e, setEducationPostGraduation)}
              {...(enablePostGraduation ? {} : { disabled: true })}
            />
          </Grid>
        </Grid>
        <div style={{display:"flex", alignItems:"center"}}>
        <FormControlLabel
          control={<Checkbox name="other" />}
          onChange={(e) => handleCheckboxChange(e, setEnableOther)}
        />
        <h5>Other</h5>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Stream"
              variant="outlined"
              margin="normal"
              onChange={(e) => handleChange(e, setEducationOther)}
              value={educationOther.stream}
              name="stream"
              {...(enableOther ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              name="instituteName"
              me
              value={educationOther.instituteName}
              onChange={(e) => handleChange(e, setEducationOther)}
              {...(enableOther ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Passing Year"
              type="number"
              name="passingYear"
              value={educationOther.passingYear}
              onChange={(e) => handleChange(e, setEducationOther)}
              {...(enableOther ? {} : { disabled: true })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Percentage/CGPA"
              variant="outlined"
              margin="normal"
              type="number"
              name="percentage"
              value={educationOther.percentage}
              onChange={(e) => handleChange(e, setEducationOther)}
              {...(enableOther ? {} : { disabled: true })}
            />
          </Grid>
        </Grid>
        <div style={{ float: "right" }}>
          <button className={styles.global_btn} type="submit">
            Next
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EducationalDetails;
