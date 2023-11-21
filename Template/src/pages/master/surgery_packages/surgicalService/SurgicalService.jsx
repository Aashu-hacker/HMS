import React from "react";
import { useParams } from "react-router";
import CustomCss from "../../../../components/Global.module.css";
import { useNavigate } from "react-router";
import style from "./SurgicalService.module.css";
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

const SurgicalService = () => {
  const naviagte = useNavigate();
  const { id } = useParams();
  const Data = JSON.parse(localStorage.getItem("surgeryPackages"));
  const item = Data.find((item) => item.id === parseInt(id));

  if (!item) {
    return <div>Service not found</div>;
  }

  return (
    <Page title="Surgical Service">
      <div className={style.btn_container}>
        <button className={CustomCss.global_btn} onClick={() => naviagte(-1)}>
          Go back
        </button>
        <button
          className={CustomCss.global_btn}
          onClick={() => naviagte("/add_service_screen")}
        >
          Add service
        </button>
      </div>
      <div className={style.table_container}>
        <table className={style.table}>
          <tr>
            <th>Surgery Name</th>
            <td>{item.surgeryName}</td>
          </tr>
          <tr>
            <th>Surgery Amount</th>
            <td>{item.amount}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{item.description}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{item.category}</td>
          </tr>
        </table>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Surgery Name</TableCell>
              <TableCell>Charge</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Split %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Surgeon Charge</TableCell>
              <TableCell>not defind</TableCell>
              <TableCell>something</TableCell>
              <TableCell>25%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default SurgicalService;
