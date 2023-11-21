import React, { useState, useEffect } from "react";
import REACT_APP_BASE_URL from "../../API/api";
import {
  TextField,
  Container,
  Grid,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { useToast } from "@chakra-ui/react";
import styles from "../../components/Global.module.css";

const AddressDetails = ({ type }) => {
  const [userPin, setUserPin] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    permanentAddress: "",
    permanentPincode: "",
    permanentCity: "",
    permanentDistrict: "",
    permanentState: "",
    permanentCountry: "",

  });
  const [isPermanentSameAsCurrent, setIsPermanentSameAsCurrent] = useState(
    false
  );
  const toast = useToast();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePermanentSameAsCurrentChange = (event) => {
    setIsPermanentSameAsCurrent(event.target.checked);
    if (event.target.checked) {
      setFormData({
        ...formData,
        permanentAddress: formData.address,
        permanentPincode: formData.pincode,
        permanentCity: formData.city,
        permanentDistrict: formData.district,
        permanentState: formData.state,
        permanentCountry: formData.country,
      });
    } else {
      setFormData({
        ...formData,
        permanentAddress: "",
        permanentPincode: "",
        permanentCity: "",
        permanentDistrict: "",
        permanentState: "",
        permanentCountry: "",
      });
    }
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    
    try {
      const id = localStorage.getItem("doctorId");
      const response = fetch(`${REACT_APP_BASE_URL}${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step: "addressDetails",
          doctorId: id,
          data: {
            addressDetails: formData,
          },
        }),
      });
      if (response.ok) {
        toast({
          title: `Added Successfully`,
          description: "Address Details added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      
    } catch (error) {
      console.log(error);
    }
   
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}pincodes/${formData.pincode}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.codes && data.codes.length > 0) {
          const pinData = data.codes[0];
          setUserPin(pinData);
          setFormData({
            ...formData,
            city: pinData.City,
            district: pinData.District,
            state: pinData.State,
          });
        } else {
          console.error("Invalid Pincode.");
        }
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (formData.pincode) {
      fetchData();
    }
  }, [formData.pincode]);

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmitData}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>Current Address</h2>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                value={formData.address}
                name="address"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Pincode"
                type="number"
                variant="outlined"
                margin="normal"
                name="pincode"
                value={formData.pincode}
                inputProps={{ maxLength: 6 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="District"
                variant="outlined"
                margin="normal"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                margin="normal"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                margin="normal"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>Permanent Address</h2>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPermanentSameAsCurrent}
                  onChange={handlePermanentSameAsCurrentChange}
                />
              }
              label="Permanent Address is the same as Current Address?"
            />
          </FormGroup>
          {isPermanentSameAsCurrent ? (
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  margin="normal"
                  value={formData.address}
                  disabled
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Pincode"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  value={formData.pincode}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="City"
                  value={formData.city}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="District"
                  variant="outlined"
                  margin="normal"
                  value={formData.district}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  margin="normal"
                  value={formData.state}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  margin="normal"
                  value={formData.country}
                  disabled
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  value={formData.permanentAddress}
                  name="permanentAddress"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  label="Pincode"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  name="permanentPincode"
                  value={formData.permanentPincode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="City"
                  type="text"
                  name="permanentCity"
                  value={formData.permanentCity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="District"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  name="permanentDistrict"
                  value={formData.permanentDistrict}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  name="permanentState"
                  value={formData.permanentState}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  margin="normal"
                  name="permanentCountry"
                  value={formData.permanentCountry}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
        </div>
        <div style={{ float: "right" }}>
          <button
            className={styles.global_btn}
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </Container>
  );
};

export default AddressDetails;
