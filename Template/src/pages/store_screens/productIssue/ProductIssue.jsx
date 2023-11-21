import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import style from "../../../components/Global.module.css"
import Page from "@layout/Page";

const ProductIssue = () => {
  const [inputData, setInputData] = useState({
    locationName: "",
    productName: "",
    quantity: "",
    description: "",
  });

  const [err, setErr] = useState({
    locationName: "",
    productName: false,
    quantity: false,
    description: false,
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
  };

  return (
    <Page title="Product Issue">
      <div>
        <form onSubmit={handleSubmitData}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Location Name"
                variant="standard"
                margin="normal"
                onChange={handleData}
                value={inputData.locationName}
                name="locationName"
              />
            </Grid>

            {err.department && (
              <p className="error">Please enter store name</p>
            )}

            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Product Name"
                variant="standard"
                margin="normal"
                onChange={handleData}
                value={inputData.productName}
                name="productName"
              />
            </Grid>
            {err.designationCode && (
              <p className="error">Please enter product name</p>
            )}
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Quantity"
                variant="standard"
                margin="normal"
                onChange={handleData}
                value={inputData.quantity}
                name="quantity"
              />
            </Grid>
            {err.charge && <p className="error">Please enter Qty.</p>}
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Description"
                variant="standard"
                margin="normal"
                onChange={handleData}
                value={inputData.description}
                name="description"
                rows={3}
                multiline
              />
            </Grid>
          </Grid>
          {err.description && <p className="error">Please enter description</p>}
          <div style={{ float: "right", marginTop: "1rem" }}>
            <button type="submit" className={style.global_btn}>
              Issue
            </button>
            <button
              type="reset"
              className={style.global_btn}
              onClick={() =>
                setInputData({
                  locationName: "",
                  productName: "",
                  quantity: "",
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

export default ProductIssue;
