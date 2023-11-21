import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import CustomCss from "../../../../components/Global.module.css";
import REACT_APP_BASE_URL from '../../../../API/api';
import { useToast } from "@chakra-ui/react";

const AddOutSource = ({ handleClose, update }) => {
  const [inputData, setInputData] = useState({
    labName: "",
    address: "",
    contact: "",
    departmentName: "",
    status: "",
  });
  const toast = useToast()
  const [department, setDepartment] = useState([]);

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleDepartmentChange = (e) => {
    const departmentName = e.target.value;
    setInputData({ ...inputData, departmentName });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
      const data = await response.json();
      const depart = data.data;
      depart.map((item) => {
        setDepartment((prev) => [...prev, item.departmentName]);
      });
    } catch (error) { }
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}outsourceDiagnostic-master`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      })
      if (response.ok) {
        await response.json();
        toast({
          title: "Designation Added",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        handleClose();
        update()
      }
      else {
        toast({
          title: "All fields are required!!",
          status: response.msg,
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error!!",
        status: error,
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }

  };

  useEffect(() => {
    fetchData();
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
        borderRadius: "8px",
      }}>
      <h1>Add Outsource Diagnostics</h1>
      <form>
        <TextField
          fullWidth
          label="Outsource Lab Name"
          variant="outlined"
          margin="normal"
          name="labName"

          value={inputData.labName}
          onChange={handleData}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          margin="normal"
          name="address"

          value={inputData.address}
          onChange={handleData}
        />
        <TextField
          fullWidth
          label="Contact"
          variant="outlined"
          margin="normal"
          name="contact"
          value={inputData.contact}
          onChange={handleData}
          type="number"
        />
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel>Department</InputLabel>
          <Select
            label="Department"
            value={inputData.departmentName}
            onChange={handleDepartmentChange}
          >
            {department.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl margin="normal">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="status"
            value={inputData.status}
            onChange={handleData}
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
        <div className="button-group">
          <button className={CustomCss.global_btn} onClick={handleFormData}>
            Save
          </button>
          <button className={CustomCss.global_btn} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOutSource;
