import React, { useState, useEffect } from 'react';
import { Modal, TextField, FormControl, InputLabel, Select, MenuItem, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import REACT_APP_BASE_URL from 'API/api';
import { useToast } from '@chakra-ui/react';

const Edit = ({ open, onClose, item,getAppointmentSchedulling }) => {

  const [startTime, setStartTime] = useState(item.startTime);
  const [endTime, setEndTime] = useState(item.endTime);
  const [department, setDepartment] = useState([]);
  const [timeInterval, setTimeInterval] = useState(item.timeInterval);
  const [scheduling, setScheduling] = useState(item.scheduling);
  const [status, setStatus] = useState(item.status);

  const [inputData, setInputData] = useState({
    doctorName: item.doctorName,
    departmentName: item.departmentName,
  });

  const toast = useToast();

  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleDepartmentNameChange = (event) => {
    setInputData({ ...inputData, departmentName: event.target.value });
  };

  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  const handleSchedulingChange = (event) => {
    setScheduling(event.target.value);
  };

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
      const data = await response.json();
      const depart = data.data;
      const departmentNames = depart.map((item) => item.departmentName);
      setDepartment(departmentNames);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}appointmentSchedule-master/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorName: inputData.doctorName,
          departmentName: inputData.departmentName,
          startTime: startTime,
          endTime: endTime,
          timeInterval: timeInterval,
          scheduling: scheduling,
          status: status,
        }),
      });

      const data = await response.json();
      console.log(data);
      onClose();
      getAppointmentSchedulling();
      toast({
        title: 'Appointment Updated!!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      });

    } catch (error) {
      console.log(error);
    }
  };



  
  useEffect(() => {
    fetchDepartment();
    if (item) {
      setInputData({
        doctorName: item.doctorName,
        departmentName: item.departmentName,
      });
      setStartTime(item.startTime);
      setEndTime(item.endTime);
      setTimeInterval(item.timeInterval);
      setScheduling(item.scheduling);
      setStatus(item.status);
    }
  }, [item]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          overflow: 'auto',
        }}
      >
        <h1>Edit</h1>
        <form>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
          >
            <TextField
              fullWidth
              label="Doctor Name"
              variant="outlined"
              margin="normal"
              name="doctorName"
              value={inputData.doctorName}
              onChange={handleInputData}
            />
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Department Name</InputLabel>
              <Select
                label="Department"
                value={inputData.departmentName}
                onChange={handleDepartmentNameChange}
              >
                {department.map((item, index) => {
                  return <MenuItem key={index} value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Start Time"
              variant="outlined"
              margin="normal"
              //type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
            <TextField
              fullWidth
              label="End Time"
              variant="outlined"
              margin="normal"
              //type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Time Interval</InputLabel>
              <Select
                label="Time Interval"
                value={timeInterval}
                onChange={handleTimeIntervalChange}
              >
                <MenuItem value="10">10 Min</MenuItem>
                <MenuItem value="20">20 Min</MenuItem>
                <MenuItem value="30">30 Min</MenuItem>
                <MenuItem value="40">40 Min</MenuItem>
                <MenuItem value="50">50 Min</MenuItem>
                <MenuItem value="60">1 Hour</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel>Scheduling Repeat</InputLabel>
              <Select
                label="Scheduling Repeat"
                value={scheduling}
                onChange={handleSchedulingChange}
              >
                <MenuItem value="Week">Week</MenuItem>
                <MenuItem value="Month">Month</MenuItem>
                <MenuItem value="Year">Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <FormControlLabel value="active" control={<Radio />} label="Active" />
                <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }}
              onClick={handleSubmitData}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Edit;

