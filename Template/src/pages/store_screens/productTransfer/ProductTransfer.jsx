import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useToast } from "@chakra-ui/react";
import style from "../../../components/Global.module.css"
import Page from "@layout/Page";

const ProductTransfer = () => {
  const [inputData, setInputData] = useState({
    storeName: "",
    productName: "",
    quantity: "",
    description: "",
  });

  const [err, setErr] = useState({
    storeName: "",
    productName: false,
    quantity: false,
    description: false,
  });
  const toast = useToast();

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
    <Page title="Product Transfer">
      <div>
        <form onSubmit={handleSubmitData}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Store Name"
                variant="standard"
                margin="normal"
                onChange={handleData}
                value={inputData.storeName}
                name="storeName"
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
          <div style={{ float: "right", marginTop: "1rem" }}>
            <button type="submit" className={style.global_btn}>
              Transfer
            </button>
            <button
              type="reset"
              className={style.global_btn}
              onClick={() =>
                setInputData({
                  storeName: "",
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

export default ProductTransfer;
