import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import CustomCss from "../../../../components/Global.module.css";
import REACT_APP_BASE_URL from "API/api";
import { useToast } from '@chakra-ui/react';

const MachineMaster = ({ onClose }) => {
  const [res, setRes] = useState([]);
  const toast = useToast()
  const [inputData, setInputData] = useState({
    machineName: "",
    methodName: "",
    department: "",
  });
  let id = ''
  const [allData, setAllData] = useState([])
  const [formData, setFormData] = useState([]);
  const [department, setDepartment] = useState([]);
  const selectedDepartment = inputData.department

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  if (allData.length !== 0) {
    const filteredData = allData.filter((item) => {
      if (item.departmentName === selectedDepartment) {
        return item
      }
    })
    if (filteredData.length !== 0) {
      id = filteredData[0]._id
    }
  }

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setInputData({ ...inputData, department });
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}machine-radiology-master`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputData, departmentId: id }),
      });

      if (response.ok) {
        toast({
          title: "Machine Master Created",
          description: "Machine master has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create machine master.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating machine master:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating machine master.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setInputData({
      machineName: "",
      methodName: "",
      department: "",
    });

    onClose();
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
      const data = await response.json();
      const depart = data.data;
      const departments = data.data.map((el) => el.departmentName);
      setRes(departments);
      setAllData(data.data)
      depart.map((item) => {
        setDepartment((prev) => [...prev, item.departmentName]);
      });
    } catch (error) { }
  };

  useEffect(() => {
    fetchDepartmentData();
    const storedData = JSON.parse(localStorage.getItem("machineName") || "[]");
    setFormData(storedData);
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
      <h1>Machine Master</h1>
      <form>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <TextField
            fullWidth
            label="Machine Name"
            variant="outlined"
            margin="normal"
            name="machineName"
            value={inputData.machineName}
            onChange={handleData}
          />
          <TextField
            fullWidth
            label="Method Name"
            variant="outlined"
            margin="normal"
            name="methodName"
            value={inputData.methodName}
            onChange={handleData}
          />
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              value={inputData.department}
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
        </div>
        <div style={{ float: "right", marginTop: "1rem" }}>
          <button className={CustomCss.global_btn} onClick={handleFormData}>
            Save
          </button>
          <button className={CustomCss.global_btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MachineMaster;
