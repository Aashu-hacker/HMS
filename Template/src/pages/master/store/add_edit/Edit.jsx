import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Radio, RadioGroup, FormControlLabel, Autocomplete, Button } from '@mui/material';
import { useToast } from '@chakra-ui/react';
import REACT_APP_BASE_URL from 'API/api';

function Edit({ handleClose, update, item }) {
    const [res, setRes] = useState([]);
    const toast = useToast()
    const [inputData, setInputData] = useState({
        storeName: item.storeName,
        location: item.location,
        description: item.description,
        purchasingStatus: item.purchasingStatus,
        department: item.department,
        status: item.status
    });

    async function FetchData() {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
            const data = await response.json();
            const departments = data.data.map((el) => el.departmentName);
            setRes(departments);
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

    useEffect(() => {
        FetchData();
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function handleSubmitData(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}store-master/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputData)
            })
            if (response.ok) {
                console.log(response.json());
                toast({
                    title: 'Store Updated!!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                });
            }
            handleClose()
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
                    onChange={handleInputChange} />
                <TextField fullWidth label="location" variant="outlined" margin="normal"
                    name='location'
                    value={inputData.location}
                    onChange={handleInputChange} />
                <TextField fullWidth label="Description" variant="outlined" margin="normal"
                    name='description'
                    value={inputData.description}
                    onChange={handleInputChange} />
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
                        renderInput={(params) => <TextField {...params} label="Purchasing Status" variant='outlined' />} />
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
                    <RadioGroup value={inputData.status} onChange={(e) => setInputData({ ...inputData, status: e.target.value })} row aria-labelledby="demo-row-radio-buttons-group-label" name="status">
                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                        <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white', marginRight: '10px' }}>Update</Button>
                    <Button onClick={handleClose} variant="contained" style={{ backgroundColor: 'rgb(8,155,171)', color: 'white' }}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}

export default Edit;

