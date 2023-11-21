import React, { useState } from "react";
import "./AddDesignation.css";
import { useToast } from "@chakra-ui/react";
import { TextField } from "@mui/material";
import style from "../../../components/Global.module.css"
import REACT_APP_BASE_URL from "API/api";

const EditDesignation = ({ handleClose, editData, getData }) => {
  const [inputData, setInputData] = useState({
    designationName: editData.designationName,
    designationCode: editData.designationCode,
    description: editData.description,
  });
  const toast = useToast();

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFormData = async (e) => {
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
        title: "All the Fields Required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      try {
        const response = await fetch(`${REACT_APP_BASE_URL}/outsourceDiagnostic-master/${editData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        });
        if (response.ok) {
          await response.json();
          handleClose();
          getData();
          toast({
            title: "Success",
            description: "Designation Updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

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
      <h1>Update Designation</h1>
      <form onSubmit={handleFormData}>
        <TextField
          fullWidth
          label="Designation Name"
          variant="outlined"
          margin="normal"
          onChange={handleData}
          value={inputData.designationName}
          name="designationName"
        />
        <TextField
          fullWidth
          label="Designation Code"
          variant="outlined"
          margin="normal"
          disabled
          onChange={handleData}
          value={inputData.designationCode}
          name="designationCode"
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          onChange={handleData}
          value={inputData.description}
          name="description"
          rows={4}
          multiline
        />
        <div className="button-group">
          <button type="submit" className={style.global_btn}>
            Save
          </button>
          <button
            type="reset"
            className={style.global_btn}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>);
};

export default EditDesignation;
