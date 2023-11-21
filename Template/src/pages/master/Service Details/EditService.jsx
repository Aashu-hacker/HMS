import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useToast } from "@chakra-ui/react";
import style from "../../../components/Global.module.css";
import REACT_APP_BASE_URL from "API/api";

const EditService = ({ handleClose, getData, editData }) => {
  const [serverData, setServerData] = useState([]);
  const [store, setStore] = useState([]);
  const [inputData, setInputData] = useState({
    patientType: editData.patientType,
    patientPayee: editData.patientPayee,
    corporate: editData.corporate,
    patientEncounter: editData.patientEncounter,
    detailServiceName: editData.detailServiceName,
    serviceGroup: editData.serviceGroup,
    serviceCode: editData.serviceCode,
    accountLedger: editData.accountLedger,
    amount: editData.amount,
    priceHistory: editData.priceHistory,
    department: editData.department,
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const generateUniqueServiceCode = (name, existingCodes) => {
    const cleanedName = name.trim().toUpperCase().slice(0, 5);
    const matchingCodes = existingCodes.filter((code) =>
      code.startsWith(cleanedName)
    );
    let serialNumber = 1;
    if (matchingCodes.length > 0) {
      const serialNumbers = matchingCodes.map((code) => {
        const suffix = code.replace(cleanedName, "").trim();
        return parseInt(suffix, 10);
      });
      serialNumber = Math.max(...serialNumbers) + 1;
    }
    return `${cleanedName}${serialNumber.toString().padStart(3, "0")}`;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (inputData.serviceCode.length < 1) {
      validationErrors.serviceCode = true;
    }
    if (inputData.designationCode.length < 1) {
      validationErrors.designationCode = true;
    }
    if (inputData.description.length < 1) {
      validationErrors.description = true;
    }
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      const newCode = generateUniqueServiceCode(
        inputData.serviceCode,
        serverData.map((data) => data.serviceCode)
      );

      //   try {
      //     const response = await fetch(`${REACT_APP_BASE_URL}designation-master`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ ...inputData, designationCode: newCode }),
      //     });

      //     if (response.ok) {
      //       await response.json();
      //       setInputData({
      //         serviceCode: "",
      //         designationCode: "",
      //         description: "",
      //       });
      //       toast({
      //         title: "Designation Added",
      //         status: "success",
      //         duration: 3000,
      //         isClosable: true,
      //         position: "bottom",
      //       });
      //       handleClose();
      //       getData();
      //     } else {
      //       console.error("Server Error");
      //     }
      //   } catch (error) {
      //     toast({
      //       title: "Error",
      //       description: "Server Error",
      //       status: "error",
      //       duration: 3000,
      //       isClosable: true,
      //       position: "bottom",
      //     });
      //   }
    }
  };



  const codeData = async () => {
    // try {
    //   const response = await fetch(`${REACT_APP_BASE_URL}designation-master`);
    //   if (response.ok) {
    //     const data = await response.json();
    //     setServerData(data.data);
    //     console.log("Data fetched from server:", data.data);
    //   } else {
    //     console.error("Failed to fetch data.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  useEffect(() => {
    codeData();
  }, []);

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
      <h1>Add Service</h1>
      <form onSubmit={handleSubmitData}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Patient Type"
              variant="outlined"
              margin="normal"
              name="patientType"
              value={inputData.patientType}
              onChange={(e) => {
                const name = e.target.name;
                const value = e.target.value;
                setInputData({
                  ...inputData,
                  [name]: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="surgeryType">Surgery Type</InputLabel>
              <Select
                label="Patient Payee"
                name="patientPayee"
                value={inputData.patientPayee}
                required
                onAbort={(e) => {
                  const name = e.target.name;
                  const value = e.target.value;
                  setInputData({
                    ...inputData,
                    [name]: value,
                  });
                }}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="TPA">TPA</MenuItem>
                <MenuItem value="corporate">Corporate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Corporate"
              variant="outlined"
              margin="normal"
              name="corporate"
              value={inputData.corporate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="surgeryType">Patient Encounter</InputLabel>
              <Select
                label="Patient Encounter"
                name="patientEncounter"
                value={inputData.patientEncounter}
                required
                margin="normal"
                onAbort={(e) => {
                  const name = e.target.name;
                  const value = e.target.value;
                  setInputData({
                    ...inputData,
                    [name]: value,
                  });
                }}
              >
                <MenuItem value="IPD">IPD</MenuItem>
                <MenuItem value="OPD">OPD</MenuItem>
                <MenuItem value="walkin">walkin</MenuItem>
                <MenuItem value="causulty">Causulty</MenuItem>
                <MenuItem value="daycare">Daycare</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Detail Service Name"
              variant="outlined"
              margin="normal"
              name="DetailServiceName"
              value={inputData.detailServiceName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Service Group"
              variant="outlined"
              margin="normal"
              name="ServiceGroup"
              value={inputData.serviceGroup}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Service Code"
              variant="outlined"
              margin="normal"
              name="serviceCode"
              value={inputData.serviceCode}
              disabled
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Account Ledger"
              variant="outlined"
              margin="normal"
              name="accountLedger"
              value={inputData.accountLedger}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              margin="normal"
              name="amount"
              value={inputData.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Price History"
              variant="outlined"
              margin="normal"
              name="priceHistory"
              value={inputData.priceHistory}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Department"
              variant="outlined"
              margin="normal"
              name="department"
              value={inputData.department}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div className="button-group">
          <button type="submit" className={style.global_btn}>
            update
          </button>
          <button className={style.global_btn} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
