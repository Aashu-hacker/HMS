import React, { useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useToast } from "@chakra-ui/react";
import styles from "../../components/Global.module.css";
import { MenuItem } from "@mui/material";
import REACT_APP_BASE_URL from "API/api";

const BasicDetails = ({ type }) => {
  const toast = useToast();

  const initialFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    alternateEmail: "",
    aadhar: "",
    staffType: type,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [dateOfJoining, setDateOfJoining] = useState(new Date());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setDateOfJoining(new Date(event.target.value));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: "basicDetails",
          data: {
            basicDetails: {
              ...formData,
              dateOfJoining: dateOfJoining.toISOString(),
            },
          },
        }),
      });
      const data = await response.json();
      console.log("data", data);
      localStorage.setItem("doctorId", data.doctorId);
      if (response.ok) {
        toast({
          title: `Added Successfully`,
          description: data.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmitData}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={formData.firstName}
              name="firstName"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle Name"
              variant="outlined"
              margin="normal"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                margin="normal"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Father Name"
              variant="outlined"
              margin="normal"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mobile No"
              variant="outlined"
              margin="normal"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Alternate Mobile No"
              variant="outlined"
              margin="normal"
              name="alternateMobile"
              value={formData.alternateMobile}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Alternate Email"
              variant="outlined"
              margin="normal"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Aadhar No"
              name="aadhar"
              variant="outlined"
              margin="normal"
              value={formData.aadhar}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Staff Type"
              name="staffType"
              type="text"
              variant="outlined"
              margin="normal"
              value={formData.staffType}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date of Joining"
              variant="outlined"
              margin="normal"
              type="date"
              name="dateOfJoining"
              value={dateOfJoining.toISOString().slice(0, 10)}
              onChange={handleDateChange}
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

export default BasicDetails;
