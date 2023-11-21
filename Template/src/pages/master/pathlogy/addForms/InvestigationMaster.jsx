import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@material-ui/core";
import REACT_APP_BASE_URL from 'API/api';
import CustomCss from "../../../../components/Global.module.css";

const InvestigationMaster = ({ onClose }) => {
  const [department, setDepartment] = useState([]);
  const [formData, setFormData] = useState([]);
  const [inputData, setInputData] = useState({
    department: "",
    testName: "",
    machineName: "",
    testType: "numeric",
    unit: "",
    testRangeStart: "",
    testRangeEnd: "",
    descriptive: "",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setInputData({ ...inputData, department });
  };

  const handleTestChange = (e) => {
    const testType = e.target.value;
    setInputData({ ...inputData, testType });
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const newFormData = {
      ...inputData,
      id: new Date().getTime().toString(),
    };
    setFormData([...formData, newFormData]);
    localStorage.setItem("investigationMaster", JSON.stringify([...formData, newFormData])
    );
    setInputData({
      department: "",
      testName: "",
      machineName: "",
      testType: "numeric",
      unit: "",
      testRangeStart: "",
      testRangeEnd: "",
      descriptive: "",
    });
    onClose();
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
      }}
    >
      <h1>Investigation Master</h1>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Test Name"
              variant="outlined"
              margin="normal"
              name="testName"
              value={inputData.testName}
              onChange={handleData}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Machine Name"
              variant="outlined"
              margin="normal"
              name="machineName"
              value={inputData.machineName}
              onChange={handleData}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Test Type</InputLabel>
              <Select
                label="Test Type"
                value={inputData.testType}
                onChange={handleTestChange}
              >
                <MenuItem value="numeric">Numeric</MenuItem>
                <MenuItem value="descriptive">Descriptive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Unit"
              variant="outlined"
              margin="normal"
              name="unit"
              value={inputData.unit}
              onChange={handleData}
            />
          </Grid>
          {inputData.testType === "numeric" && (
            <Grid item xs={6}>
              <div>
                <label>Test Range</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    label="Start"
                    variant="outlined"
                    name="testRangeStart"
                    value={inputData.testRangeStart}
                    onChange={handleData}
                  />
                  <span>-</span>
                  <TextField
                    fullWidth
                    label="End"
                    variant="outlined"
                    name="testRangeEnd"
                    value={inputData.testRangeEnd}
                    onChange={handleData}
                  />
                </div>
              </div>
            </Grid>
          )}
          {inputData.testType === "descriptive" && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Descriptive"
                variant="outlined"
                margin="normal"
                name="descriptive"
                value={inputData.descriptive}
                onChange={handleData}
              />
            </Grid>
          )}
        </Grid>
        <div style={{ float: "right", marginTop: "1rem" }}>
          <button className={CustomCss.global_btn} onClick={handleFormData}>
            Save
          </button>
          <button className={CustomCss.global_btn} onClick={() => onClose()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestigationMaster;
