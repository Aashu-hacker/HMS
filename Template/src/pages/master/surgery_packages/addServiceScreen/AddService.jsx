import React, { useState } from "react";
import { TextField } from "@mui/material";
import style from "../../../../components/Global.module.css"
import Page from "@layout/Page";

const AddService = () => {
  const [inputData, setInputData] = useState({
    department: "",
    serviceName: "",
    charge: "",
    description: "",
  });
  const [err, setErr] = useState({
    department: "",
    serviceName: false,
    charge: false,
    description: false,
  });

  const handleData = (e) => {
  };

  const handleSubmitData = async (e) => {
  };

  return (
    <Page title="Add Service">
      <div>
        <form onSubmit={handleSubmitData}>
          <TextField
            fullWidth
            label="Department"
            variant="standard"
            margin="normal"
            onChange={handleData}
            value={inputData.department}
            name="department"
          />
          {err.department && (
            <p className="error">Please enter department</p>
          )}
          <TextField
            fullWidth
            label="Service Name"
            variant="standard"
            margin="normal"
            onChange={handleData}
            value={inputData.serviceName}
            name="serviceName"
          />
          {err.designationCode && (
            <p className="error">Please enter service name</p>
          )}
          <TextField
            fullWidth
            label="Charge"
            variant="standard"
            margin="normal"
            onChange={handleData}
            value={inputData.charge}
            name="charge"
          />
          {err.charge && <p className="error">Please enter Charge</p>}
          <TextField
            fullWidth
            label="Description"
            variant="standard"
            margin="normal"
            onChange={handleData}
            value={inputData.description}
            name="description"
            rows={4}
            multiline
          />
          {err.description && <p className="error">Please enter description</p>}
          <div style={{ float: "right", marginTop: "1rem" }}>
            <button type="submit" className={style.global_btn}>
              Save
            </button>
            <button
              type="reset"
              className={style.global_btn}
              onClick={() =>
                setInputData({
                  department: "",
                  serviceName: "",
                  charge: "",
                  description: "",
                })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default AddService;
