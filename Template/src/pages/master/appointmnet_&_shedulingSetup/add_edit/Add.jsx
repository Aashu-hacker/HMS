import React, { useState, useEffect } from 'react';
import { Modal, TextField, FormControl, InputLabel, Select, MenuItem, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import REACT_APP_BASE_URL from 'API/api';
import axios from "axios";
import { useToast } from '@chakra-ui/react';

const Add = ({ open, onClose, getAppointmentSchedulling }) => {
    const [department, setDepartment] = useState([]);
    const [inputData, setInputData] = useState({
        doctorName: "",
        departmentName: "",
        startTime: "",
        endTime: "",
        timeInterval: "",
        scheduling: "",
        status: "",
    });
    const toast = useToast();
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

    const handleData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${REACT_APP_BASE_URL}appointmentSchedule-master`, inputData);
            onClose();
            getAppointmentSchedulling();
            setInputData({
                doctorName: "",
                departmentName: "",
                startTime: "",
                endTime: "",
                timeInterval: "",
                scheduling: "",
                status: "",
            });
            toast({
                title: 'Appointment Added!!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: 'Server error!!',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '30px', borderRadius: "10px", overflow: "auto" }}>
                <h1>Add</h1>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: "1rem",
                        }}
                    >
                        <TextField value={inputData.doctorName}
                            onChange={handleData} name="doctorName" fullWidth label="Doctor Name" variant="outlined" margin="normal" style={{ height: '30px' }} />
                        <FormControl margin="normal" fullWidth variant="outlined">
                            <InputLabel>Department Name</InputLabel>
                            <Select
                                label="Department"
                                name="departmentName"
                                value={inputData.departmentName}
                                onChange={handleData}>
                                {department.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Start Time"
                            variant="outlined"
                            margin="normal"
                            type="time"
                            name="startTime"
                            value={inputData.startTime}
                            onChange={handleData}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }} />
                        <TextField
                            fullWidth
                            label="End Time"
                            variant="outlined"
                            margin="normal"
                            type="time"
                            name="endTime"
                            value={inputData.endTime}
                            onChange={handleData}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }} />
                        <FormControl margin="normal" fullWidth variant="outlined">
                            <InputLabel>Time Interval</InputLabel>
                            <Select
                                label="Time Interval"
                                name="timeInterval"
                                value={inputData.timeInterval}
                                onChange={handleData}
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
                            <InputLabel>Sheduling Repeat</InputLabel>
                            <Select
                                label="Sheduling Repeat"
                                name="scheduling"
                                value={inputData.scheduling}
                                onChange={handleData}>
                                <MenuItem value="Week">Week</MenuItem>
                                <MenuItem value="Month">Month</MenuItem>
                                <MenuItem value="Year">Year</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal">
                            <RadioGroup name="status"
                                value={inputData.status}
                                onChange={handleData} row aria-labelledby="demo-row-radio-buttons-group-label" >
                                <FormControlLabel value="active" control={<Radio />} label="Active" />
                                <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }}>Save</Button>
                        <Button variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>Cancel</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default Add;


