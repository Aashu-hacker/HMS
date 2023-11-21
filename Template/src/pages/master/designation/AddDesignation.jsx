import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useToast } from "@chakra-ui/react";
import "./AddDesignation.css";
import style from "../../../components/Global.module.css";
import REACT_APP_BASE_URL from "API/api";     //

const AddDesignation = ({ handleClose, getData }) => {
  const [serverData, setServerData] = useState([]);
  const [inputData, setInputData] = useState({
    designationName: "",
    designationCode: "",
    description: "",
  });
  const toast = useToast();

  const generateUniqueDesignationCode = (name, existingCodes) => {
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

    if (inputData.designationName.length < 1) {
      validationErrors.designationName = true;
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
      const newCode = generateUniqueDesignationCode(
        inputData.designationName,
        serverData.map((data) => data.designationCode)
      );

      try {
        const response = await fetch(`${REACT_APP_BASE_URL}designation-master`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...inputData, designationCode: newCode }),
        });
        if (response.ok) {
          await response.json();
          setInputData({
            designationName: "",
            designationCode: "",
            description: "",
          });
          toast({
            title: "Designation Added",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          handleClose();
          getData();
        } else {
          console.error("Server Error");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Server Error",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const codeData = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}designation-master`);
      if (response.ok) {
        const data = await response.json();
        setServerData(data.data);
        console.log("Data fetched from server:", data.data);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      <h1>Add Designation</h1>
      <form onSubmit={handleSubmitData}>
        <TextField
          fullWidth
          label="Designation Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            const name = e.target.name;
            const value = e.target.value;
            setInputData({
              ...inputData,
              [name]: value,
              designationCode: generateUniqueDesignationCode(
                value,
                serverData.map((data) => data.designationCode)
              ),
            });
          }}
          value={inputData.designationName}
          name="designationName"
        />
        <TextField
          fullWidth
          label="Designation Code"
          variant="outlined"
          margin="normal"
          value={inputData.designationCode}
          name="designationCode"
          disabled
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            const name = e.target.name;
            const value = e.target.value;
            setInputData({
              ...inputData,
              [name]: value,
            });
          }}
          value={inputData.description}
          name="description"
          rows={4}
          multiline
        />
        <div className="button-group">
          <button type="submit" className={style.global_btn}>
            Save
          </button>
          <button className={style.global_btn} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDesignation;
