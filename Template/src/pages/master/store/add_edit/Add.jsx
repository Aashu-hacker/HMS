import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Radio, RadioGroup, FormControlLabel, Autocomplete, Button } from '@mui/material';
import REACT_APP_BASE_URL from 'API/api';
import { useToast } from '@chakra-ui/react';

function Add({ openRegistrationModal, closeRegistration, update }) {
    const [res, setRes] = useState([]);
    let id = ''
    const [allData, setAllData] = useState([])
    const toast = useToast()
    const [inputData, setInputData] = useState({
        storeName: "",
        location: "",
        description: "",
        purchasingStatus: "",
        department: "",
        status: "",
    });
    const selectedDepartment = inputData.department

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

    async function FetchData() {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
            const data = await response.json();
            const departments = data.data.map((el) => el.departmentName);
            setRes(departments);
            setAllData(data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        FetchData();
    }, [id]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function handleSubmitData(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}store-master`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputData, departmentId: id })
            })
            if (response.ok) {
                console.log(response.json());
                toast({
                    title: 'Store Added!!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                });
            }
            closeRegistration()
            update()
        } catch (error) {
            console.error("Error fetching data:", error);
            toast({
                title: 'Server Error!!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    return (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
        }}>
            <h1>Add Store</h1>
            <form onSubmit={handleSubmitData}>
                <TextField fullWidth
                    label="Store Name"
                    variant="outlined"
                    margin="normal"
                    name='storeName'
                    value={inputData.storeName}
                    onChange={handleInputChange}
                />
                <TextField fullWidth label="location" variant="outlined" margin="normal"
                    name='location'
                    value={inputData.location}
                    onChange={handleInputChange}
                />
                <TextField fullWidth label="Description" variant="outlined" margin="normal"
                    name='description'
                    value={inputData.description}
                    onChange={handleInputChange}
                />
                <FormControl margin="normal" fullWidth variant="outlined" >
                    <Autocomplete
                        id="purchasing-status"
                        disablePortal
                        options={["Yes", "No"]}
                        name='purchasingStatus'
                        value={inputData.purchasingStatus}
                        onChange={(event, newValue) => {
                            handleInputChange({ target: { name: 'purchasingStatus', value: newValue } });
                        }}
                        renderInput={(params) => <TextField {...params} label="Purchasing Status" variant='outlined' />}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth variant="outlined" >
                    <Autocomplete
                        id="department-name"
                        disablePortal
                        options={res}
                        name='department'
                        value={inputData.department}
                        onChange={(event, newValue) => {
                            handleInputChange({ target: { name: 'department', value: newValue } });
                        }}
                        renderInput={(params) => <TextField {...params} label="Department Name" variant='outlined' />}
                    />
                </FormControl>
                <FormControl margin="normal">
                    <RadioGroup onChange={handleInputChange} row aria-labelledby="demo-row-radio-buttons-group-label" name="status">
                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                        <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }}>Save</Button>
                    <Button variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}

export default Add;
