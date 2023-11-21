import React from "react";
import style from "./Store.module.css";
import CustomCss from "../../../components/Global.module.css";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Page from "@layout/Page";

const Store = () => {
  const navigate = useNavigate();
  return (
    <Page title="Store">
      <div>
        <div className={style.top_bar}>
          <div>
            <button
              className={CustomCss.global_btn}
              onClick={() => navigate("/product_transfer")}
            >
              Product Transfer
            </button>
            <button
              className={CustomCss.global_btn}
              onClick={() => navigate("/product_issue")}
            >
              Product Issue
            </button>
            <button
              className={CustomCss.global_btn}
              onClick={() => navigate("/product_return")}
            >
              Product Return
            </button>
          </div>
          <button className={CustomCss.global_btn}>Store Selection</button>
          <button className={CustomCss.global_btn} onClick={() => navigate('/asset_register')}>
            Asset Register
          </button>
        </div>
        <Paper >
          <TableContainer>
            <Table aria-label="Department Table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Code</TableCell>
                  <TableCell>Batch no.</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell>Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Product 1</TableCell>
                  <TableCell>Product Code 1</TableCell>
                  <TableCell>Batch no. 1</TableCell>
                  <TableCell>Expiry Date 1</TableCell>
                  <TableCell>Stock 1</TableCell>
                  <TableCell>Location 1</TableCell>
                  <TableCell>Purchase Price 1</TableCell>
                  <TableCell>GST 1</TableCell>
                  <TableCell>Total Amount 1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Page>
  );
};

export default Store;
