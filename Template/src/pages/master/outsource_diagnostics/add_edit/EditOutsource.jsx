import React, { useState, useEffect } from "react";
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    TextField,
    Autocomplete
} from "@mui/material";
import CustomCss from "../../../../components/Global.module.css";
import REACT_APP_BASE_URL from '../../../../API/api';
import { useToast } from "@chakra-ui/react";

const EditOutsource = ({ handleClose, update, item }) => {
    const [res, setRes] = useState([]);
    const toast = useToast()
    const [inputData, setInputData] = useState({
        labName: item.labName,
        address: item.address,
        contact: item.contact,
        departmentName: item.departmentName,
        status: item.status
    });

    async function FetchData() {
        try {
            const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
            const data = await response.json();
            const department = data.data.map((el) => el.departmentName);
            setRes(department);
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
            const response = await fetch(`${REACT_APP_BASE_URL}outsourceDiagnostic-master/${item._id}`, {
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
            <h1>Edit Outsource Diagnostics</h1>
            <form onSubmit={handleSubmitData}>
                <TextField
                    fullWidth
                    label="Outsource Lab Name"
                    variant="outlined"
                    margin="normal"
                    name="labName"
                    value={inputData.labName}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    name="address"
                    value={inputData.address}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    label="contact"
                    variant="outlined"
                    margin="normal"
                    name="contact"
                    value={inputData.contact}
                    onChange={handleInputChange}
                    type="number"
                />
                <FormControl margin="normal" fullWidth variant="outlined" >
                    <Autocomplete
                        id="department-name"
                        disablePortal
                        options={res}
                        name='departmentName'
                        value={inputData.departmentName}
                        onChange={(event, newValue) => {
                            handleInputChange({
                                target: {
                                    name: 'departmentName',
                                    value: newValue,
                                },
                            });
                        }}
                        renderInput={(params) => <TextField {...params} label="Department Name" variant='outlined' />}
                    />
                </FormControl>
                <FormControl margin="normal">
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                        value={inputData.status}
                        onChange={handleInputChange}
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
                    <button className={CustomCss.global_btn} type="submit">
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

export default EditOutsource;
