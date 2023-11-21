import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Container, Grid } from '@material-ui/core';
import Page from '@layout/Page';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import styles from "../components/Global.module.css";
import REACT_APP_BASE_URL from "../API/api";

const CompanySetup = () => {
  const [formData, setFormData] = useState({});
  const toast = useToast()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`${REACT_APP_BASE_URL}company-setup/${formData._id}`, formData)
      .then((response) => {
        const data = response.data
        toast({
          title: 'Saved!!',
          description: data.msg,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      })
      .catch((error) => {
        console.error('Error updating company details:', error);
      });
  };

  const fetchCompanySetup = () => {
    axios
      .get(`${REACT_APP_BASE_URL}company-setup`)
      .then((response) => {
        const companyData = response.data;
        setFormData(companyData.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching company details:', error);
      });
  };

  useEffect(() => {
    fetchCompanySetup();
  }, []);

  return (
    <>
      <Page title='Company Setup'>
        <Container maxWidth="xl">
          <form onSubmit={handleEditSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hospital Name"
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  size="small"
                  onChange={handleChange}
                  disabled
                  InputLabelProps={{
                    shrink: formData.hospitalName !== '',
                  }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hospital Address"
                  type="text"
                  name="hospitalAddress"
                  value={formData.hospitalAddress}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.hospitalAddress !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="State"
                  size="small"
                  value={formData.State}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.State !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="City"
                  value={formData.City}
                  size="small"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.City !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="District"
                  name="District"
                  value={formData.District}
                  size="small"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.District !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="Pincode"
                  value={formData.Pincode}
                  size="small"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.Pincode !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile No"
                  name="mobileNumber"
                  size="small"
                  value={formData.mobileNumber}
                  type="number"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.mobileNumber !== '',
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Landline"
                  name="landlineNumber"
                  size="small"
                  value={formData.landlineNumber}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.landlineNumber !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  size="small"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: formData.email !== '',
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website Link"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  size="small"
                  InputLabelProps={{
                    shrink: formData.website !== '',
                  }} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isPrimary"
                      checked={formData.isPrimary === true}
                      onChange={handleChange}
                      color="primary" />
                  }
                  label="Is Primary Hospital" />
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button className={styles.global_btn} type="submit" variant="contained" style={{ padding: "1rem", width: "7rem", fontWeight: "bolder" }}>
                Save
              </button>
            </div>
          </form>
        </Container>
      </Page>
    </>
  );
};

export default CompanySetup;
