import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Grid,
} from "@material-ui/core";
import { useToast } from "@chakra-ui/react";
import styles from "../../components/Global.module.css";

const BankingDetails = ({ type }) => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    BranchName: "",
  });
  const toast = useToast();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const storageKey = `${type}Staff`;
    toast({
      title: `${type} Staff Added Successfully`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }

  useEffect(() => {
  }, []);

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmitData}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Account Holder Name"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={formData.accountHolderName}
              name="accountHolderName"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="PAN Number"
              type="text"
              variant="outlined"
              margin="normal"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Bank Name"
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Account Number"
              variant="outlined"
              margin="normal"
              type="number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="IFSC Code"
              variant="outlined"
              margin="normal"
              type="number"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Branch Name"
              variant="outlined"
              margin="normal"
              name="BranchName"
              value={formData.BranchName}
              onChange={handleChange}
              type="text"
              required
            />
          </Grid>
        </Grid>
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

export default BankingDetails;
